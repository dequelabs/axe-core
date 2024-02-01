const { globSync } = require('glob');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const chromedriver = require('chromedriver');

const args = process.argv.slice(2);

// allow running certain browsers through command line args
// (only one browser supported, run multiple times for more browsers)
let browserArg = 'chrome';
args.forEach(arg => {
  // pattern: browsers=Chrome
  const parts = arg.split('=');
  if (parts[0] === 'browser') {
    browserArg = parts[1].toLowerCase();
  }
});

/**
 * Keep injecting scripts until window.mochaResults is set
 */
function collectTestResults(driver) {
  // inject a script that waits half a second
  return driver
    .executeAsyncScript(() => {
      const callback = arguments[arguments.length - 1];
      setTimeout(() => {
        if (!window.mocha) {
          callback('mocha-missing;' + window.location.href);
        }
        // return the mocha results (or undefined if not finished)
        callback(window.mochaResults);
      }, 500);
    })
    .then(result => {
      // If there are no results, listen a little longer
      if (typeof result === 'string' && result.includes('mocha-missing')) {
        throw new Error(
          'Mocha does not exist in: ' +
            result.split(';')[1] +
            '\nIf using a frame, put the file in a subdirectory'
        );
      }
      if (!result) {
        return collectTestResults(driver);

        // if there are, return them
      } else {
        return Promise.resolve(result);
      }
    });
}

/**
 * Test each URL
 */
function runTestUrls(driver, isMobile, urls, errors) {
  const url = urls.shift();
  errors = errors || [];

  return (
    driver
      .get(url)
      // Get results
      .then(() => {
        return Promise.all([
          driver.getCapabilities(),
          collectTestResults(driver)
        ]);
      })
      // And process them
      .then(promiseResults => {
        const capabilities = promiseResults[0];
        const result = promiseResults[1];
        const browserName =
          capabilities.get('browserName') +
          (capabilities.get('mobileEmulationEnabled') ? '-mobile' : '');
        console.log(url + ' [' + browserName + ']');

        // Remember the errors
        (result.reports || []).forEach(err => {
          console.log(err.message);
          err.url = url;
          err.browser = browserName;
          errors.push(err);
        });

        // Log the result of the page tests
        console[result.failures ? 'error' : 'log'](
          'passes: ' +
            result.passes +
            ', ' +
            'failures: ' +
            result.failures +
            ', ' +
            'duration: ' +
            result.duration / 1000 +
            's'
        );
        console.log();
      })
      .then(() => {
        // Start the next job, if any
        if (urls.length > 0) {
          return runTestUrls(driver, isMobile, urls, errors);
        } else {
          driver.quit();
          return Promise.resolve(errors);
        }
      })
  );
}

/*
 * Build web driver depends whether REMOTE_SELENIUM_URL is set
 */
function buildWebDriver(browser) {
  let webdriver;
  const mobileBrowser = browser.split('-mobile');

  // fix chrome DevToolsActivePort file doesn't exist in CricleCI (as well as a
  // host of other problems with starting Chrome). the only thing that seems to
  // allow Chrome to start without problems consistently is using ChromeHeadless
  // @see https://stackoverflow.com/questions/50642308/webdriverexception-unknown-error-devtoolsactiveport-file-doesnt-exist-while-t
  if (browser === 'chrome') {
    const service = new chrome.ServiceBuilder(chromedriver.path).build();

    const options = new chrome.Options().addArguments([
      'headless',
      '--no-sandbox',
      '--disable-extensions',
      '--disable-dev-shm-usage'
    ]);
    webdriver = chrome.Driver.createSession(options, service);
  } else if (browser === 'firefox') {
    const options = new firefox.Options().addArguments('--headless');
    webdriver = firefox.Driver.createSession(options);
  }

  if (process.env.REMOTE_SELENIUM_URL) {
    webdriver.usingServer(process.env.REMOTE_SELENIUM_URL);
  }

  return {
    driver: webdriver,
    isMobile: mobileBrowser.length > 1
  };
}

function start(options) {
  // yes, really, and this isn't documented anywhere either.
  options.browser =
    options.browser === 'edge' ? 'MicrosoftEdge' : options.browser;

  const testUrls = globSync(['test/integration/full/**/*.{html,xhtml}'], {
    ignore: '**/frames/**/*.{html,xhtml}'
  }).map(url => {
    return 'http://localhost:9876/' + url;
  });

  if (
    (process.platform === 'win32' && options.browser === 'safari') ||
    (process.platform === 'darwin' &&
      ['ie', 'MicrosoftEdge'].indexOf(options.browser) !== -1) ||
    ((process.platform === 'linux' || process.env.REMOTE_SELENIUM_URL) &&
      ['ie', 'MicrosoftEdge', 'safari'].indexOf(options.browser) !== -1)
  ) {
    console.log();
    console.log(
      'Skipped ' + options.browser + ' as it is not supported on this platform'
    );
    return process.exit();
  }

  // try to load the browser
  const webDriver = buildWebDriver(options.browser);
  const driver = webDriver.driver;
  const isMobile = webDriver.isMobile;

  driver.manage().setTimeouts({
    pageLoad: 50000,
    script: !isMobile ? 60000 * 5 : 60000 * 10
  });

  // Test all pages
  runTestUrls(driver, isMobile, testUrls)
    .then(testErrors => {
      // log each error and abort
      testErrors.forEach(err => {
        console.log();
        console.log('URL: ' + err.url);
        console.log('Browser: ' + err.browser);
        console.log('Describe: ' + err.titles.join(' > '));
        console.log('it ' + err.name);
        console.log(err.stack);
        console.log();
      });

      process.exit(testErrors.length);

      // catch any potential problems
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
}

start({ browser: browserArg });
