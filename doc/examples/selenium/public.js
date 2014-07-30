/*jshint node: true */
'use strict';

var WebDriver = require('selenium-webdriver'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
	path = require('path'),
	fs = require('fs'),
	ksInject = require('./ks-inject'),
	ks = path.resolve(__dirname, '../../../dist/kensington.js'),
	jar = path.resolve(__dirname, '../../../build/selenium-server-standalone-2.41.0.jar');


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

driver.get('http://www.amazon.com/')
	.then(function () {
		ksInject(ks, driver, function () {
			driver.executeAsyncScript(function () {
				/*global document, dqre */
				var callback = arguments[arguments.length - 1];
				dqre.a11yCheck(document, null, callback);
			})
			.then(function (result) {
				fs.writeFile('results.json', JSON.stringify(result, null, '  '), function () {
					driver.quit();
				});
			});

		});
	});