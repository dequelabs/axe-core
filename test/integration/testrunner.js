var WebDriver = require('selenium-webdriver'),
	assert = require('chai').assert,
	test = require('selenium-webdriver/testing'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
	jar = 'build/selenium-server-standalone-2.41.0.jar',
	config = require('../../build/test.json');


test.describe('Integration', function () {
	'use strict';

	var driver;

	test.before(function() {
		var server = new SeleniumServer(jar, {
			port: 4444,
			args: ['-Xmx512m']
		});

		server.start();

		driver = new WebDriver.Builder()
			.usingServer(server.address())
			.withCapabilities(WebDriver.Capabilities.firefox())
			.build();
		driver.manage().timeouts().setScriptTimeout(10000);
	});


	test.after(function() {
		driver.quit();
	});
	function r(testIndex) {
		return function() { runTest(driver, testIndex); };
	}
	for (var i = 0; i < config.length; i++) {
		test.it(config[i].description, r(i));
	}
});

function runTest(driver, i) {
	'use strict';

	function filterRule (r) {
		return r.id === conf.rule;
	}

	var conf = config[i];
	driver.get(conf.url)
		.then(function() {
			//should give an error
			driver.executeAsyncScript(function() {
				var callback = arguments[arguments.length - 1];
				dqre.a11yCheck(document, null, callback);
			})
			.then(function(result) {
				var violations = result.violations.filter(filterRule),
					passes = result.passes.filter(filterRule);

				checkIdenticality(conf, violations, 'violations');
				checkIdenticality(conf, passes, 'passes');

				assert.ok(violations.length + passes.length > 0, 'No result found for rule "' + conf.rule + '"');
			});
		});
}

function checkIdenticality(conf, actual, type) {
	'use strict';

	if (conf[type]) {
		assert.ok(actual.length === 1, 'No ' + type + ' results found for rule "' + conf.rule + '"');
	}

	var v = ((actual[0] || {}).nodes || []).map(function (t) { return t.target; });
	assert.deepEqual(v, conf[type] || [], type);

}

