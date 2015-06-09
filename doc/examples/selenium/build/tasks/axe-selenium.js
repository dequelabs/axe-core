/*jshint node: true */
'use strict';

var WebDriver = require('selenium-webdriver'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
	path = require('path'),
	ksInject = require('../inject'),
	ks = path.resolve(__dirname, '../../../../../axe.min.js');

module.exports = function (grunt) {
	var ksSource = grunt.file.read(ks);
	grunt.registerMultiTask('axe-selenium', function () {

		var jar = this.options({jar: 'build/selenium-server-standalone-2.45.0.jar'}).jar,
			done = this.async(),
			count = this.data.length;

		// start the selenium server
		var server = new SeleniumServer(path.resolve(__dirname, '../../', jar), {
			port: 4444,
			args: ['-Xmx512m']
		});

		server.start();

		var driver = new WebDriver.Builder()
			.usingServer(server.address())
			.withCapabilities(WebDriver.Capabilities.firefox())
			.build();


		driver.manage().timeouts().setScriptTimeout(10000);

		this.data.forEach(function (testUrl) {
			driver.get(testUrl)
				.then(function () {
					ksInject(ksSource, driver, function () {
						driver.executeAsyncScript(function () {
							/*global document, axe, window */
							var callback = arguments[arguments.length - 1];
							axe.a11yCheck(document, null, function (results) {
								callback({results: results, url: window.location.href});
							});
						})
						.then(function (result) {
							grunt.file.write(result.url.replace(/[^a-z0-9]/gi, '-')
								.replace(/-{2,}/g, '-').replace(/^-|-$/g, '').toLowerCase() + '.json',
								JSON.stringify(result.results, null, '  '));

							if (!--count) {
								driver.quit();
								server.stop();
								done(result.results.violations.length === 0);
							}
						});

					});
				});
		});

	});
};
