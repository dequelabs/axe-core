const path = require('path');
const fs = require('fs/promises');
const { createReadStream } = require('fs');
const http = require('http');
const os = require('os');
const { getWebdriver } = require('../test/get-webdriver');

const serverPort = 9898;
const axePath = require.resolve('../axe.js');
const numRuns = 25;

// linear-interpolated percentile — expects a numeric array sorted ascending
function percentile(sorted, p) {
  const rank = (sorted.length - 1) * p;
  const lo = Math.floor(rank);
  const hi = Math.ceil(rank);
  if (lo === hi) {return sorted[lo];}
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
  await driver.manage().setTimeouts({ script: 60000 });

  let result;
  let server;

  try {
    for (const page of pages) {
      if (page !== 'mdn') {continue;}
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
          numRuns,
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

      const metrics = [];
      for (let i = 0; i < numRuns; i++) {
        console.log(`Sample ${i + 1} of ${numRuns}`);
        metrics.push(await runSample());
        await sleep(1000);
      }

      const pageResult = {
        url: `/sites/${page}`,
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
      break;
    }

    const filePath = path.join(__dirname, 'logs', `${result.timestamp}.json`);
    await fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf8');
  } finally {
    await driver.quit();
    if (server) {
      await new Promise(r => server.close(r));
    }
  }
})();
