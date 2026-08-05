import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import net from 'net';
import { summaryReporter } from '@web/test-runner';
import { Builder } from 'selenium-webdriver';
import {
  Options as ChromeOptions,
  ServiceBuilder as ChromeService
} from 'selenium-webdriver/chrome.js';
import {
  Options as FirefoxOptions,
  ServiceBuilder as GeckoService
} from 'selenium-webdriver/firefox.js';

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
    const browserVersion =
      cap.getBrowserVersion() || cap.get('browserVersion') || '';
    this.name =
      [browserName, browserVersion].filter(Boolean).join(' ') || 'Browser';
    this.driver = await this.driverBuilder.build();
    // Keep-alive heartbeat (mirrors SeleniumLauncher for Sauce Labs compatibility)
    this._heartbeat = setInterval(async () => {
      try {
        await this.driver?.getTitle();
      } catch {
        clearInterval(this._heartbeat);
      }
    }, 60000);
  }

  async stop() {
    clearInterval(this._heartbeat);
    try {
      await this.driver?.quit();
    } catch {
      /* ignore */
    }
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
    const sessionDone = new Promise(resolve => {
      resolveStop = resolve;
    });
    this._sessions.set(id, resolveStop);

    // navigate: wait for chain (previous session) then drive to url
    const navigate = this._chain.then(() => this.driver.navigate().to(url));

    // The chain advances only after this session finishes (stopSession resolves sessionDone)
    this._chain = navigate.then(() => sessionDone);

    // startSession resolves once navigation is done; WTR then waits for WebSocket results
    return navigate;
  }

  isActive(id) {
    return this._sessions.has(id);
  }

  getBrowserUrl() {
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

  const builder = new Builder().forBrowser('chrome').setChromeOptions(options);

  // Use an explicit chromedriver path when provided via env; otherwise fall
  // back to the npm `chromedriver` package so Selenium Manager doesn't try
  // to download a mismatched version at runtime.
  const chromedriverBin =
    process.env.CHROMEDRIVER_BIN || require('chromedriver').path;
  builder.setChromeService(new ChromeService(chromedriverBin));

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
    <!-- Loaded as a module so it can use top-level import statements.
         Module scripts execute after classic scripts, so axe/chai/sinon globals
         are available. The immediate registerHooks() call inside testutils returns
         early (beforeEach not yet defined); the inline module below re-calls it
         after the WTR framework has set up mocha globals. -->
    <script type="module" src="/test/testutils.js"></script>

    <!-- WTR mocha test framework (must be a module) -->
    <script type="module" src="${testFramework}"></script>

    <!-- Register mocha beforeEach/afterEach hooks now that the test framework
         has set up mocha globals. This inline module runs after the framework. -->
    <script type="module">
      axe.testUtils.registerHooks();
    </script>
  </body>
</html>
`;

const sharedConfig = {
  reporters: [summaryReporter()],

  testFramework: {
    config: {
      ui: 'bdd',
      timeout: 4000
    }
  },

  testRunnerHtml,

  middleware: [proxyMiddleware],

  // Show console.log but suppress info/warn/error (mostly 404 noise).
  filterBrowserLogs: ({ type }) => type === 'log',

  // Resolve bare module specifiers from node_modules
  nodeResolve: true
};

// Default files when no --files flag is passed on the CLI.
const defaultFiles = [
  'test/core/**/*.js',
  'test/commons/**/*.js',
  'test/rule-matches/**/*.js',
  'test/checks/**/*.js',
  'test/integration/api/**/*.js',
  'test/integration/virtual-rules/**/*.js',
  'test/gather-internals/**/*.js',
  'tmp/integration-tests/**/*.js'
];

function findAvailablePort(startPort) {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on('error', () => resolve(findAvailablePort(startPort + 1)));
  });
}

const port = await findAvailablePort(9876);

export default {
  rootDir: projectRoot,
  port,
  browsers: getBrowsers(),
  files: defaultFiles,
  ...sharedConfig
};
