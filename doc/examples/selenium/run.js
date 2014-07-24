/*jshint node: true */
'use strict';

var WebDriver = require('selenium-webdriver'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
	path = require('path'),
	jar = path.resolve(__dirname, '../../../build/selenium-server-standalone-2.41.0.jar'),
	// start a static server to serve our test file
	staticServer = require('./static-server')(path.resolve(__dirname, '../../../'), 1337);



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


driver.get('http://localhost:1337/doc/examples/selenium/test.html')
	.then(function () {
		/*global dqre, document */
		//should give an error
		driver.executeAsyncScript(function () {
			var callback = arguments[arguments.length - 1];
			dqre.a11yCheck(document.getElementById('broken'), null, callback);
		})
		.then(function (result) {
			console.log(result.violations.length === 1 ? 'PASS' : 'FAIL');
		});
	})
	.then(function () {
		//should not give an error
		driver.executeAsyncScript(function () {
			var callback = arguments[arguments.length - 1];
			dqre.a11yCheck(document.getElementById('working'), null, callback);
		})
		.then(function (result) {
			console.log(result.violations.length === 0 ? 'PASS' : 'FAIL');
		});
	})
	.then(function () {
		driver.quit();
		staticServer.close();
	});

