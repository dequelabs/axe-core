const path = require('path');
const fs = require('fs/promises');
const { createReadStream } = require('fs');
const http = require('http');
const os = require('os');
const { getWebdriver } = require('../test/get-webdriver');

const serverPort = 9898;
const axePath = require.resolve('../axe.js');
const axeVersion = require('../axe.js').version;

// Sample-count bounds. Actual sample count per page is chosen adaptively
// after the warmup run: we aim to spend at most TIME_BUDGET_MS of
// axe.run wall-clock per page, so tiny pages get many samples (better
// statistics) and huge pages get few samples (finishes in reasonable
// time). Clamped between MIN_RUNS and MAX_RUNS.
const MAX_RUNS = 25;
const MIN_RUNS = 3;
const TIME_BUDGET_MS = 90_000;

function computeNumRuns(coldStartAxeMs) {
  // axe emits metric values as strings via the log-scraper (regex .groups
  // always yields strings). Coerce before doing math — Number.isFinite
  // does not accept strings.
  const ms = +coldStartAxeMs;
  if (!Number.isFinite(ms) || ms <= 0) {
    return MAX_RUNS;
  }
  const budgetFit = Math.floor(TIME_BUDGET_MS / ms);
  return Math.max(MIN_RUNS, Math.min(MAX_RUNS, budgetFit));
}

// linear-interpolated percentile — expects a numeric array sorted ascending
function percentile(sorted, p) {
  const rank = (sorted.length - 1) * p;
  const lo = Math.floor(rank);
  const hi = Math.ceil(rank);
  if (lo === hi) {
    return sorted[lo];
  }
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (rank - lo);
}

// round to 2 decimal places
function round(number) {
  return Math.round(number * 100) / 100;
}

const addr = `http://localhost:${serverPort}`;
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

function startServer(rootDir) {
  const server = http.createServer(async (req, res) => {
    const urlPath = decodeURIComponent(
      new URL(req.url, 'http://throwaway-url').pathname
    );
    let filePath = path.join(rootDir, urlPath);

    // prevent path traversal outside the site root
    if (!filePath.startsWith(rootDir)) {
      return res.writeHead(403).end('Forbidden');
    }

    try {
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
    } catch {
      return res.writeHead(404).end('Not found');
    }

    res.writeHead(200, {
      'content-type':
        MIME[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream'
    });
    createReadStream(filePath).pipe(res);
  });

  return new Promise(resolve => {
    server.listen(serverPort, () => resolve(server));
  });
}

function sleep(n) {
  return new Promise(r => {
    setTimeout(r, n);
  });
}

(async () => {
  const pages = await fs.readdir(path.join(__dirname, 'sites'));
  const axeSource = await fs.readFile(axePath, 'utf8');

  const driver = getWebdriver();
  await driver.manage().setTimeouts({ script: 600_000 });

  let result;
  let server;

  try {
    for (const page of pages) {
      if (!['very-large-page', 'mdn'].includes(page)) {
        continue;
      }
      console.info(`\nRunning performance on page sites/${page}`);

      const rootDir = path.join(__dirname, 'sites', page);
      server = await startServer(rootDir);

      await driver.get(`${addr}/index.html`);

      // wait an additional second to let things settle
      await sleep(1000);

      // inject axe-core directly into the page and run it.
      // we don't use @axe-core/webdriverjs as we want performance metrics to be
      // driven solely by axe-core and not include any processing from @axe-core/webdriverjs.
      // we'll also exclude any iframe testing to avoid iframe round trip timings
      await driver.executeScript(axeSource);

      // capture test env information only on first run
      if (!result) {
        const { testEngine, testEnvironment, testRunner, timestamp } =
          await driver.executeScript(`
          return axe.utils.getEnvironmentData();
        `);

        result = {
          testEngine,
          testEnvironment,
          testRunner,
          timestamp,
          maxRuns: MAX_RUNS,
          minRuns: MIN_RUNS,
          timeBudgetMs: TIME_BUDGET_MS,
          machine: {
            cpu: os.cpus()[0].model,
            cpuCount: os.cpus().length,
            totalMemGB: Math.round(os.totalmem() / 1024 ** 3)
          },
          pages: []
        };
      }

      // capture axe-core performance logs
      await driver.executeScript(`
        const axeMetricRegex = /Measure (?<name>.*) took (?<duration>.*)ms/;

        axe._setLogger(log => {
          const match = log.match(axeMetricRegex);
          if (match) {
            const { name, duration } = match.groups;

            // only capture this metric once to save space as the first value primes the cache and all others are cache hits
            if (name.endsWith('isVisibleToScreenReaders')) {
              if (window.axeSeenVisibleByScreenreaders) {
                return;
              }

              window.axeSeenVisibleByScreenreaders = true;
            }

            window.axeMetrics[name] = duration;
          }
        });
      `);

      const runSample = () =>
        driver.executeScript(`
        window.axeMetrics = {};
        window.axeSeenVisibleByScreenreaders = false;
        const promise = axe.run({ iframes: false, performanceTimer: true });
        return promise.then(() => window.axeMetrics);
      `);

      // warmup — JIT + cold-cache noise gets absorbed here rather than in the sample set
      console.log('Warmup');
      const coldStart = await runSample();
      await sleep(1000);

      // Adapt the sample count to the page's cold-start time. Cold-start is
      // the SLOWEST expected sample (unwarmed JIT, empty caches), so
      // dividing our time budget by it gives a conservative upper bound
      // on how many samples we can afford. Tiny pages hit MAX_RUNS; huge
      // pages fall back to MIN_RUNS.
      const numRuns = computeNumRuns(coldStart.axe);
      console.log(
        `Using ${numRuns} samples (cold-start axe=${round(coldStart.axe)}ms, budget=${TIME_BUDGET_MS}ms)`
      );

      const metrics = [];
      for (let i = 0; i < numRuns; i++) {
        console.log(`Sample ${i + 1} of ${numRuns}`);
        metrics.push(await runSample());
        await sleep(1000);
      }

      const pageResult = {
        url: `/sites/${page}`,
        numRuns,
        metrics: []
      };

      for (const name of Object.keys(metrics[0])) {
        const values = metrics.map(m => +m[name]).sort((a, b) => a - b);
        pageResult.metrics.push({
          name,
          coldStart: round(coldStart[name]),
          min: round(values[0]),
          p50: round(percentile(values, 0.5)),
          p95: round(percentile(values, 0.95))
        });
      }

      pageResult.metrics.sort((a, b) => b.p50 - a.p50);
      result.pages.push(pageResult);

      await new Promise(r => server.close(r));
      server = null;
    }

    const filePath = path.join(__dirname, 'logs', `v${axeVersion}.json`);
    await fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf8');
  } finally {
    await driver.quit();
    if (server) {
      await new Promise(r => server.close(r));
    }
  }
})();
