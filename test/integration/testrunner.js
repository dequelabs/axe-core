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

				if (conf.violations) {
					assert.equal(violations.length, 1, 'No violation results found for rule "' + conf.rule + '"');
					checkIdenticality(violations[0], conf, 'violations');
				}
				if (conf.passes) {
					assert.equal(passes.length, 1, 'No pass results found for rule "' + conf.rule + '"');
					checkIdenticality(passes[0], conf, 'passes');
				}

				assert.ok(violations.length + passes.length > 0, 'No result found for rule "' + conf.rule + '"');
			});
		});
}

function checkIdenticality(r, conf, type) {
	'use strict';
	var selectors = conf[type];
	var i;
	for (i = 0; i < selectors.length; i++) {
		assert.deepEqual(selectors[i], (r.nodes[i] || {}).target, 'Expected node not found of type ' + type);
	}

	for (i = 0; i < r.nodes.length; i++) {
		assert.deepEqual(r.nodes[i].target, selectors[i], 'Node not expected of type' + type);
	}
}

