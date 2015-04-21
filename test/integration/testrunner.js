var WebDriver = require('selenium-webdriver'),
	assert = require('chai').assert,
	test = require('selenium-webdriver/testing'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
	jar = 'build/selenium-server-standalone-2.45.0.jar',
	config = require('../../build/test.json');

function checkIdenticality(conf, actual, type) {
	'use strict';

	if (conf[type]) {
		assert.ok(actual.length === 1, 'No ' + type + ' results found for rule "' + conf.rule + '"');
	}

	var v = ((actual[0] || {}).nodes || []).map(function(t) {
		return t.target;
	});
	assert.deepEqual(v, conf[type] || [], type);
}

function runTest(driver, i) {
	'use strict';

	function filterRule(r) {
		return r.id === conf.rule;
	}

	var conf = config.tests[i];
	driver.get(conf.url)
		.then(function() {
			//should give an error
			driver.executeAsyncScript(function(rule) {
					/*global dqre, document */
					var callback = arguments[arguments.length - 1];
					dqre.a11yCheck(document, {
						runOnly: {
							type: 'rule',
							values: [rule]
						}
					}, callback);
				}, conf.rule)
				.then(function(result) {
					var violations = result.violations.filter(filterRule),
						passes = result.passes.filter(filterRule);

					checkIdenticality(conf, violations, 'violations');
					checkIdenticality(conf, passes, 'passes');

					assert.ok(violations.length + passes.length > 0, 'No result found for rule "' + conf.rule + '"');
				});
		});
}

test.describe('Integration', function() {
	'use strict';

	var driver;

	test.before(function() {
		if (config.options.seleniumServer === undefined) {
			var server = new SeleniumServer(jar, {
				port: 4444,
				args: ['-Xmx512m']
			});

			server.start();

			config.options.seleniumServer = server.address();
		}

		driver = new WebDriver.Builder()
			.usingServer(config.options.seleniumServer)
			.withCapabilities(WebDriver.Capabilities.firefox())
			.build();
		driver.manage().timeouts().setScriptTimeout(10000);
	});


	test.after(function() {
		driver.quit();
	});

	function r(testIndex) {
		return function() {
			runTest(driver, testIndex);
		};
	}

	for (var i = 0; i < config.tests.length; i++) {
		test.it(config.tests[i].description, r(i));
	}
});
