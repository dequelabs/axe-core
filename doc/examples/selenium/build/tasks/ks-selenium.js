/*jshint node: true */
'use strict';

var WebDriver = require('selenium-webdriver'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
	path = require('path'),
	ksInject = require('../inject'),
	ks = path.resolve(__dirname, '../../../../../kensington.min.js'),
	jar = path.resolve(__dirname, '../../build/selenium-server-standalone-2.41.0.jar');

module.exports = function (grunt) {
	var ksSource = grunt.file.read(ks);
	grunt.registerMultiTask('ks-selenium', function () {

		var done = this.async(),
			count = this.data.length;

		// start the selenium server
		var server = new SeleniumServer(jar, {
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
							/*global document, dqre, window */
							var callback = arguments[arguments.length - 1];
							dqre.a11yCheck(document, null, function (results) {
								callback({results: results, url: window.location.href});
							});
						})
						.then(function (result) {
							grunt.file.write(result.url.replace(/[^a-z0-9]/gi, '-')
								.replace(/-{2,}/g, '-').replace(/^-|-$/g, '').toLowerCase() + '.json',
								JSON.stringify(result.results, null, '  '));

							if (!--count) {
								driver.quit();
								done(result.results.violations === 0);
							}
						});

					});
				});
		});

	});
};