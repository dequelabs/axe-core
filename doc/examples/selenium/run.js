/*jshint node: true */
'use strict';


var WebDriver = require('selenium-webdriver'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
	jar = 'selenium-server-standalone-2.41.0.jar';

var server = new SeleniumServer(jar, {
	port: 4444,
	args: ['-Xmx512m']
});

server.start();

var driver = new WebDriver.Builder()
.usingServer(server.address())
.withCapabilities(WebDriver.Capabilities.firefox())
.build();


driver.get("http://localhost:9876/doc/examples/selenium/test.html")
.then(function() {
	//should give an error
	driver.executeAsyncScript(function() {
		var callback = arguments[arguments.length - 1];
		dqre.a11yCheck(document.getElementById("broken"), null, callback);
	})
	.then(function(result) {
		console.log(result.violations.length === 1 ? "PASS" : "FAIL");
	});
})
.then(function() {
	//should not give an error
	driver.executeAsyncScript(function() {
		var callback = arguments[arguments.length - 1];
		dqre.a11yCheck(document.getElementById("working"), null, callback);
	})
	.then(function(result) {
		console.log(result.violations.length === 0 ? "PASS" : "FAIL");
	});
});

