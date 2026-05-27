import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { globSync } from 'glob';
import { defaultReporter } from '@web/test-runner';
import { Builder } from 'selenium-webdriver';
import { Options as ChromeOptions, ServiceBuilder as ChromeService } from 'selenium-webdriver/chrome.js';
import { Options as FirefoxOptions, ServiceBuilder as GeckoService } from 'selenium-webdriver/firefox.js';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve the project root relative to this config file (test/wtr.config.mjs → ../)
const projectRoot = path.resolve(__dirname, '..');

/**
 * A custom Selenium launcher that navigates the WebDriver directly to each
 * test URL instead of using WTR's default IFrameManager (which wraps tests in
 * iframes on a /?mode=iframe container page).
 *
 * Benefits over the default iframe approach:
 * - Tests run at the root document (window === window.top)
 * - window.location.pathname reflects the actual test path, not '/'
 * - No cross-frame complications for frame-sensitive tests
 *
 * Sessions are serialized via a promise chain so only one test file is
 * active at a time in the single browser tab.
 */
class DirectSeleniumLauncher {
  constructor(driverBuilder) {
    this.driverBuilder = driverBuilder;
    this.name = 'Initializing...';
    this.type = 'selenium';
    // Each startSession appends to this chain; the chain only advances after
    // the previous session's stopSession is called.
    this._chain = Promise.resolve();
    // Maps sessionId → resolveStop function so stopSession can unblock the chain.
    this._sessions = new Map();
  }

  async initialize(config) {
    this.config = config;
    const cap = this.driverBuilder.getCapabilities();
    const browserName = cap.getBrowserName() || cap.get('browserName') || '';
    const browserVersion = cap.getBrowserVersion() || cap.get('browserVersion') || '';
    this.name = [browserName, browserVersion].filter(Boolean).join(' ') || 'Browser';
    this.driver = await this.driverBuilder.build();
    // Keep-alive heartbeat (mirrors SeleniumLauncher for Sauce Labs compatibility)
    this._heartbeat = setInterval(async () => {
      try { await this.driver?.getTitle(); } catch { clearInterval(this._heartbeat); }
    }, 60000);
  }

  async stop() {
    clearInterval(this._heartbeat);
    try { await this.driver?.quit(); } catch { /* ignore */ }
    this.driver = undefined;
  }

  /**
   * Start a test session by navigating directly to `url`.
   * Blocks until the previous session's stopSession() is called, then navigates.
   * Returns a Promise that resolves once navigation completes (browser is ready).
   */
  startSession(id, url) {
    // resolveStop lets stopSession() unblock the next startSession in the chain
    let resolveStop;
    const sessionDone = new Promise(resolve => { resolveStop = resolve; });
    this._sessions.set(id, resolveStop);

    // navigate: wait for chain (previous session) then drive to url
    const navigate = this._chain.then(() => this.driver.navigate().to(url));

    // The chain advances only after this session finishes (stopSession resolves sessionDone)
    this._chain = navigate.then(() => sessionDone).catch(() => {});

    // startSession resolves once navigation is done; WTR then waits for WebSocket results
    return navigate;
  }

  isActive(id) {
    return this._sessions.has(id);
  }

  getBrowserUrl(_sessionId) {
    return this.driver.getCurrentUrl();
  }

  async stopSession(id) {
    const resolveStop = this._sessions.get(id);
    this._sessions.delete(id);
    resolveStop?.(); // unblock the next queued startSession
    return { testCoverage: undefined };
  }

  async startDebugSession(_id, url) {
    await this.driver.navigate().to(url);
  }
}

/**
 * Build a Selenium Chrome launcher.
 * @param {object} opts
 * @param {boolean} [opts.headless=true]
 * @param {number} [opts.debugPort] - If set, opens remote-debugging on this port.
 */
function buildChromeLauncher({ headless = true, debugPort } = {}) {
  const options = new ChromeOptions();
  if (process.env.CHROME_BIN) {
    options.setBinaryPath(process.env.CHROME_BIN);
  }
  if (headless) {
    options.addArguments('--headless=new');
  }
  // Required for Chrome in sandboxed CI environments
  options.addArguments('--no-sandbox', '--disable-dev-shm-usage');
  if (debugPort) {
    options.addArguments(`--remote-debugging-port=${debugPort}`);
  }

  const builder = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options);

  // Use an explicit chromedriver path when provided via env; otherwise
  // Selenium Manager (bundled in selenium-webdriver 4.6+) downloads it
  // automatically to match the installed Chrome version.
  if (process.env.CHROMEDRIVER_BIN) {
    builder.setChromeService(new ChromeService(process.env.CHROMEDRIVER_BIN));
  }

  return new DirectSeleniumLauncher(builder);
}

export { buildChromeLauncher };

/**
 * Build a Selenium Firefox launcher.
 * @param {object} opts
 * @param {string} [opts.binary] - Path to the Firefox binary.
 * @param {boolean} [opts.headless=true]
 */
function buildFirefoxLauncher({ binary, headless = true } = {}) {
  const options = new FirefoxOptions();
  if (binary) {
    options.setBinary(binary);
  }
  if (headless) {
    options.addArguments('-headless');
  }

  const builder = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options);

  // Use an explicit geckodriver path when provided; otherwise Selenium Manager
  // (bundled with selenium-webdriver 4.6+) downloads it automatically.
  if (process.env.GECKODRIVER_BIN) {
    builder.setFirefoxService(new GeckoService(process.env.GECKODRIVER_BIN));
  }

  return new DirectSeleniumLauncher(builder);
}

/**
 * Select the browser(s) to run based on the WTR_BROWSER environment variable.
 * Defaults to headless Chrome when WTR_BROWSER is not set.
 *
 * Supported values:
 *   chrome          - headless Chrome (default)
 *   chrome-debug    - non-headless Chrome with remote debugging on port 9765
 *   firefox         - headless Firefox (uses FIREFOX_BIN if set)
 *   firefox-nightly - headless Firefox Nightly (uses FIREFOX_NIGHTLY_BIN)
 */
function getBrowsers() {
  switch (process.env.WTR_BROWSER) {
    case 'firefox':
      return [buildFirefoxLauncher({ binary: process.env.FIREFOX_BIN })];
    case 'firefox-nightly':
      return [
        buildFirefoxLauncher({ binary: process.env.FIREFOX_NIGHTLY_BIN })
      ];
    case 'chrome-debug':
      return [buildChromeLauncher({ headless: false, debugPort: 9765 })];
    default:
      return [buildChromeLauncher({ headless: true })];
  }
}

/**
 * Koa-style middleware to rewrite legacy Karma proxy paths to their real
 * locations under the project root:
 *   /mock/*        → /test/mock/*
 *   /integration/* → /test/integration/*
 */
async function proxyMiddleware(ctx, next) {
  if (ctx.url.startsWith('/mock/')) {
    ctx.url = '/test' + ctx.url;
  } else if (ctx.url.startsWith('/integration/')) {
    ctx.url = '/test' + ctx.url;
  }
  await next();
}

/** HTML page injected for every test file. Mirrors what Karma's frameworks
 *  (mocha/chai/sinon) and `files` config provided globally. */
const testRunnerHtml = testFramework => /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>axe-core tests</title>
    <!-- Baseline stylesheet so tests that count document.styleSheets see at least one sheet -->
    <style>/* axe-core test baseline */</style>
  </head>
  <body>
    <div id="fixture"></div>

    <!-- Core axe-core bundle (required by all tests) -->
    <script src="/axe.js"></script>
    <!-- Walk-tree utility (generated by the build) -->
    <script src="/tmp/walk-tree.js"></script>

    <!-- chai UMD — exposes window.chai with assert/expect/should -->
    <script src="/node_modules/chai/chai.js"></script>
    <!-- sinon browser bundle — exposes window.sinon -->
    <script src="/node_modules/sinon/pkg/sinon.js"></script>
    <script>
      // Expose chai helpers as globals to match Karma's karma-chai behaviour
      /* globals chai */
      var assert = chai.assert;
      var expect = chai.expect;
    </script>

    <!-- axe test utilities (MockCheckContext, fixtures, etc.) -->
    <script src="/test/testutils.js"></script>

    <!-- WTR mocha test framework (must be a module) -->
    <script type="module" src="${testFramework}"></script>

    <!-- Register mocha beforeEach/afterEach hooks now that the test framework
         has set up mocha globals. Regular scripts (testutils.js above) run
         before module scripts, so beforeEach/afterEach are not yet available
         when testutils.js loads. This inline module runs after the framework. -->
    <script type="module">
      axe.testUtils.registerHooks();
    </script>
  </body>
</html>
`;

// Wrap the default reporter to:
//   1. Suppress 404 network request noise (tests intentionally fetch missing assets).
//   2. Show an elapsed-time counter on stderr while the bundle is running so the
//      terminal doesn't look frozen (each group is one WTR session, so the progress
//      bar only ticks once per group rather than once per file).
const base = defaultReporter();
let _timer = null;
let _timerStart = null;

const reporters = [
  {
    ...base,
    start(args) {
      _timerStart = Date.now();
      _timer = setInterval(() => {
        const s = Math.floor((Date.now() - _timerStart) / 1000);
        process.stderr.write(`\r  running... ${s}s`);
      }, 1000);
      return base.start?.call(this, args);
    },
    reportTestFileResults(args) {
      // Zero out request404s so the default reporter skips that section
      return base.reportTestFileResults({
        ...args,
        sessionsForTestFile: args.sessionsForTestFile.map(s => ({
          ...s,
          request404s: []
        }))
      });
    },
    reportSummary(args) {
      if (_timer) {
        clearInterval(_timer);
        _timer = null;
        process.stderr.write('\r' + ' '.repeat(20) + '\r');
      }
      return base.reportSummary?.call(this, args);
    }
  }
];

/** File globs for each named test group.
 *  `files` — stub entry point served by groupBundlePlugin (one per group).
 *  `glob`  — the real test files concatenated into that stub at serve time. */
export const groupDefs = [
  { name: 'core',             files: 'test/groups/core.js',             glob: 'test/core/**/*.js'                     },
  { name: 'commons',          files: 'test/groups/commons.js',          glob: 'test/commons/**/*.js'                   },
  { name: 'rule-matches',     files: 'test/groups/rule-matches.js',     glob: 'test/rule-matches/**/*.js'              },
  { name: 'checks',           files: 'test/groups/checks.js',           glob: 'test/checks/**/*.js'                    },
  { name: 'api',              files: 'test/groups/api.js',              glob: 'test/integration/api/**/*.js'           },
  { name: 'integration',      files: 'test/groups/integration.js',      glob: 'tmp/integration-tests/**/*.test.js'     },
  { name: 'virtual-rules',    files: 'test/groups/virtual-rules.js',    glob: 'test/integration/virtual-rules/**/*.js' },
  { name: 'gather-internals', files: 'test/groups/gather-internals.js', glob: 'test/gather-internals/**/*.js'          },
];

/**
 * WTR plugin that intercepts requests for group stub files and returns the
 * concatenated source of every real test file in that group.
 *
 * Each file is wrapped in an IIFE so `var` declarations don't leak across
 * files.  All files share one Mocha instance, so `.only` works naturally
 * across the entire group without any pre-scan.
 */
function groupBundlePlugin() {
  // Map URL path → glob pattern, built once at startup
  const bundleMap = Object.fromEntries(
    groupDefs.map(({ files, glob }) => ['/' + files, glob])
  );

  return {
    name: 'group-bundle',
    serve(context) {
      const glob = bundleMap[context.path];
      if (!glob) return;

      const files = globSync(glob, { cwd: projectRoot });
      const body = files
        .map(f => {
          const src = readFileSync(path.join(projectRoot, f), 'utf-8');
          return `;(function(){\n// === ${f} ===\n${src}\n})();`;
        })
        .join('\n');

      return { body, type: 'js' };
    }
  };
}

const sharedConfig = {
  reporters,

  testFramework: {
    config: {
      ui: 'bdd',
      timeout: 4000
    }
  },

  testRunnerHtml,

  middleware: [proxyMiddleware],

  plugins: [groupBundlePlugin()],

  // Suppress browser console output from the reporter. Test failures surface
  // through Mocha assertions (the ❌ section), not through browser logs, so
  // this output is pure noise. Use --manual + DevTools when you need to see it.
  filterBrowserLogs: () => false,

  // Resolve bare module specifiers from node_modules
  nodeResolve: true
};

export default {
  // Serve files from the project root. Must be an absolute path or resolved
  // relative to process.cwd() — we use an absolute path derived from this
  // config file's location to be unambiguous.
  rootDir: projectRoot,

  browsers: getBrowsers(),

  ...sharedConfig,

  // Named groups — each maps to a npm test:unit:<name> script.
  // Run a single group: npm run test:unit -- --group core
  // Run all groups:     npm run test:unit
  // Note: the 'integration' group requires `npm run build:integration-tests`
  // to be run first to populate tmp/integration-tests/.
  // Each group's `files` points to a stub in test/groups/; groupBundlePlugin
  // intercepts that request and serves the real test files concatenated.
  groups: groupDefs.map(({ name, files }) => ({ name, files, ...sharedConfig }))
};
