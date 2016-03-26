/*jshint node: true */
'use strict';
var Promise = require('promise');
var WebDriver = require('selenium-webdriver');
module.exports = function (grunt) {
	grunt.registerMultiTask('test-webdriver', function () {
		var options = this.options({
			browser: 'firefox'
		});
		var done = this.async();
		var driver = new WebDriver.Builder()
			.forBrowser(options.browser)
			.build();

		driver.manage().timeouts().setScriptTimeout(5000);

		Promise.all(options.urls.map(function (url) {
			return new Promise(function(resolve) {
				driver
					.get(url)
					.then(function () {
						driver.executeAsyncScript(function () {
							/*global window */
							var callback = arguments[arguments.length - 1];
							setTimeout(function isDone() {
								if (!window.mochaResults) {
									return setTimeout(isDone, 250);
								}
								window.mochaResults.url = window.location.href;
								callback(window.mochaResults);
							}, 250);
						})
						.then(function (results) {
							resolve(results);
						});

					});
			});
		})).then(function (results) {
			driver.quit().then(function () {
				results.forEach(function (result) {
					grunt.log.writeln(result.url);
					if (result.failures) {
						grunt.log.error(result.failures + ' failing tests');
					} else {
						grunt.log.ok(result.passes + ' passing tests');
					}
				});
				done(results);
			});
		});
	});
};
