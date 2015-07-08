/*jshint node: true */
'use strict';

var WebDriver = require('selenium-webdriver'),
	axeBuilder = require('axe-webdriverjs');

module.exports = function (grunt) {
	grunt.registerMultiTask('axe-selenium', function () {

		var done = this.async(),
			count = this.data.length;

		var driver = new WebDriver.Builder()
			.forBrowser('firefox')
			.build();

		driver.manage().timeouts().setScriptTimeout(10000);

		this.data.forEach(function (testUrl) {
			driver.get(testUrl)
				.then(function () {
					axeBuilder(driver)
						.analyze(function (result) {
							grunt.file.write(result.url.replace(/[^a-z0-9]/gi, '-')
								.replace(/-{2,}/g, '-').replace(/^-|-$/g, '').toLowerCase() + '.json',
								JSON.stringify(result, null, '  '));

							if (!--count) {
								driver.quit();
								done(result.violations.length === 0);
							}
						});
					});
				});
	});
};
