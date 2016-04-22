/*global window */
/*jshint node: true */
'use strict';

var Promise = require('promise');
var WebDriver = require('selenium-webdriver');

// Keep looking at the page until the results are in
function collectTestResults(driver) {
	// inject a script that waits half a second
	return driver.executeAsyncScript(function () {
		var callback = arguments[arguments.length - 1];
		setTimeout(function () {
			if (window.mochaResults) {
				window.mochaResults.url = window.location.href;
			}
			// return the mocha results (or undefined if not finished)
			callback(window.mochaResults);
		}, 500);

	}).then(function (result) {
		// If there are no results, listen a little longer
		if (!result) {
			return collectTestResults(driver);

		// if there are, return them
		} else {
			return Promise.resolve(result);
		}
	});
}

module.exports = function (grunt) {
	grunt.registerMultiTask('test-webdriver', function () {
		var options = this.options({
			browser: 'firefox'
		});

		var done = this.async();
		var errors = [];
		var driver;

		if (options.browser === 'edge') {
			// yes, really, and this isn't documented anywhere either.
			options.browser = 'MicrosoftEdge';
		}

		if ((process.platform === 'win32' && options.browser === 'safari') ||
			(process.platform === 'darwin' && ['ie', 'MicrosoftEdge'].indexOf(options.browser) !== -1)
		) {
			grunt.log.writeln();
			grunt.log.writeln('Skipped ' + browser + ' as it is not supported on this platform');
			return done();
		}

		// try to load the browser
		try {
			driver = new WebDriver.Builder();
			driver.forBrowser(options.browser)
			.build();

			driver.manage().timeouts().setScriptTimeout(600);

		// If load fails, warn user and move to the next task
		} catch (err) {
			grunt.log.writeln();
			grunt.log.error(err.message);
			grunt.log.writeln('Aborted testing using ' + options.browser);
			return done();
		}

		var testAllPages = options.urls
		.map(function (url) {
			// open the page
			return driver.get(url)
			.then(function () {
				// Run all tests and collect the results
				return collectTestResults(driver);

			}).then(function (result) {
				// log which page was tested
				grunt.log.writeln(result.url);

				// Remember the errors
				(result.reports || []).forEach(function (err) {
					grunt.log.error(err.message);
					err.url = url;
					errors.push(err);
				});

				// Log the result of the page tests
				grunt.log[ (result.failures ? 'error' : 'ok') ](
					'passes: ' + result.passes + ', ' +
					'failures: ' + result.failures + ', ' +
					'duration: ' + (result.duration / 1000) +'s'
				);
				grunt.log.writeln();
			});
		});

		Promise.all(testAllPages)
		.then(function () {
			return driver.quit()

		}).then(function () {
			// If there are no errors, continue
			if (errors.length === 0) {
				done(true);

			// else log each error and abort
			} else {
				errors.forEach(function(err) {
					grunt.log.writeln();
					grunt.log.error('URL: ' + err.url);
					grunt.log.error('Describe: ' + err.titles.join(' > '));
					grunt.log.error('it ' + err.name);
					grunt.log.error(err.stack);
					grunt.log.writeln();
				});
				done(false);
			}

		// catch any potential problems
		}).catch(function (err) {
			grunt.log.error(err);
			done(false);
		});

	});
};
