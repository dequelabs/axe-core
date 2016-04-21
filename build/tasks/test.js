/*jshint node: true */
'use strict';

var Promise = require('promise');
var WebDriver = require('selenium-webdriver');

function collectTestResults(driver, resolve, reject) {
	driver.executeAsyncScript(function () {
		/*global window */
		var callback = arguments[arguments.length - 1];
		setTimeout(function isDone() {
			if (window.mochaResults) {
				window.mochaResults.url = window.location.href;
			}
			callback(window.mochaResults);
		}, 500);
	})
	.then(function (results) {
		if (!results) {
			collectTestResults(driver, resolve, reject);
		} else {
			resolve(results);
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

		try {
			driver = new WebDriver.Builder()
			.forBrowser(options.browser)
			.build();

		} catch(err) {
			grunt.log.writeln();
			grunt.log.error(err.message);
			grunt.log.writeln('Aborted testing using ' + options.browser);
			return done();
		}

		driver.manage().timeouts().setScriptTimeout(600);

		var runAllTests =
		Promise.all(options.urls.map(function (url) {
			return new Promise(function(resolve, reject) {
				driver.get(url)
				.then(function () {
					collectTestResults(driver, resolve, reject);
				});
			}).then(function (result) {
				grunt.log.writeln(result.url);

				(result.reports || []).forEach(function (err) {
					grunt.log.error(err.message);
					err.url = url;
					errors.push(err);
				});
				var msg = 'passes: ' + result.passes +
						', failures: ' + result.failures +
						', duration: ' + (result.duration / 1000) +'s'
				if (result.failures) {
					grunt.log.error(msg);
				} else {
					grunt.log.ok(msg);
				}
				grunt.log.writeln();
			});
		})).then(function (results) {
			driver.quit()
			.then(function () {

				if (errors.length === 0) {
					done(true);
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

			});
		});
	});
};
