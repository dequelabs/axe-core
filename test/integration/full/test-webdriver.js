/*global window, Promise */

var globby = require('globby');
var WebDriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var chromedriver = require('chromedriver');

var args = process.argv.slice(2);

// allow running certain browsers through command line args
// (only one browser supported, run multiple times for more browsers)
var browser = 'chrome';
args.forEach(function (arg) {
  // pattern: browsers=Chrome
  var parts = arg.split('=');
  if (parts[0] === 'browser') {
    browser = parts[1].toLowerCase();
  }
});

/**
 * Keep injecting scripts until window.mochaResults is set
 */
function collectTestResults(driver) {
  // inject a script that waits half a second
  return driver
    .executeAsyncScript(function () {
      var callback = arguments[arguments.length - 1];
      setTimeout(function () {
        if (!window.mocha) {
          callback('mocha-missing;' + window.location.href);
        }
        // return the mocha results (or undefined if not finished)
        callback(window.mochaResults);
      }, 500);
    })
    .then(function (result) {
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
  var url = urls.shift();
  errors = errors || [];

  return (
    driver
      .get(url)
      // Get results
      .then(function () {
        return Promise.all([
          driver.getCapabilities(),
          collectTestResults(driver)
        ]);
      })
      // And process them
      .then(function (promiseResults) {
        var capabilities = promiseResults[0];
        var result = promiseResults[1];
        var browserName =
          capabilities.get('browserName') +
          (capabilities.get('mobileEmulationEnabled') ? '-mobile' : '');
        console.log(url + ' [' + browserName + ']');

        // Remember the errors
        (result.reports || []).forEach(function (err) {
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
      .then(function () {
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
  // Pinned to selenium-webdriver@4.3.0
  // https://github.com/SeleniumHQ/selenium/pull/10796/files#diff-6c87d95a2288e92e15a6bb17710c763c01c2290e679beb26220858f3218b6a62L260

  var capabilities;
  var mobileBrowser = browser.split('-mobile');

  if (mobileBrowser.length > 1) {
    browser = mobileBrowser[0];
    capabilities = {
      browserName: mobileBrowser[0],
      chromeOptions: {
        mobileEmulation: {
          deviceMetrics: {
            width: 320,
            height: 568,
            pixelRatio: 2
          }
        }
      }
    };
  }

  // fix chrome DevToolsActivePort file doesn't exist in CricleCI (as well as a
  // host of other problems with starting Chrome). the only thing that seems to
  // allow Chrome to start without problems consistently is using ChromeHeadless
  // @see https://stackoverflow.com/questions/50642308/webdriverexception-unknown-error-devtoolsactiveport-file-doesnt-exist-while-t
  if (browser === 'chrome') {
    var service = new chrome.ServiceBuilder(chromedriver.path).build();
    chrome.setDefaultService(service);

    capabilities = WebDriver.Capabilities.chrome();
    capabilities.set('chromeOptions', {
      args: [
        '--no-sandbox',
        '--headless',
        '--disable-extensions',
        '--disable-dev-shm-usage'
      ]
    });
  }

  var webdriver = new WebDriver.Builder()
    .withCapabilities(capabilities)
    .forBrowser(browser);

  if (process.env.REMOTE_SELENIUM_URL) {
    webdriver.usingServer(process.env.REMOTE_SELENIUM_URL);
  }

  // @see https://github.com/SeleniumHQ/selenium/issues/6026
  if (browser === 'safari') {
    var safari = require('selenium-webdriver/safari');
    var server = new safari.ServiceBuilder()
      .addArguments('--legacy')
      .build()
      .start();

    webdriver.usingServer(server);
  }

  return {
    driver: webdriver.build(),
    isMobile: mobileBrowser.length > 1
  };
}

function start(options) {
  var driver;
  var isMobile = false;
  // yes, really, and this isn't documented anywhere either.
  options.browser =
    options.browser === 'edge' ? 'MicrosoftEdge' : options.browser;

  var testUrls = globby
    .sync([
      'test/integration/full/**/*.{html,xhtml}',
      '!**/frames/**/*.{html,xhtml}'
    ])
    .map(function (url) {
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
  try {
    var webDriver = buildWebDriver(options.browser);
    driver = webDriver.driver;
    isMobile = webDriver.isMobile;
    // If load fails, warn user and move to the next task
  } catch (err) {
    console.log();
    console.log(err.message);
    console.log('Aborted testing using ' + options.browser);
    return process.exit();
  }

  driver.manage().setTimeouts({
    pageLoad: 50000,
    script: !isMobile ? 60000 * 5 : 60000 * 10
  });

  // Test all pages
  runTestUrls(driver, isMobile, testUrls)
    .then(function (testErrors) {
      // log each error and abort
      testErrors.forEach(function (err) {
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
    .catch(function (err) {
      console.log(err);
      process.exit(1);
    });
}

start({ browser: browser });
