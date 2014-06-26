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
	});


	test.after(function() {
		driver.quit();
	});

	for (var i = 0; i < config.length; i++) {
		test.it(config[i].description, function(testIndex) {
			return function() { runTest(driver, testIndex); };
		}(i));
	}
});

function runTest(driver, i) {
	'use strict';
	driver.get(config[i].url)
	.then(function() {
		//should give an error
		driver.executeAsyncScript(function() {
			var callback = arguments[arguments.length - 1];
			dqre.a11yCheck(document, null, callback);
		})
		.then(function(result) {
			checkIdenticality(result.violations, config[i].rule, config[i].violations || []);
			checkIdenticality(result.passes, config[i].rule, config[i].passes || []);
		});
	});
}


function checkIdenticality(result, rule, selectors) {
	'use strict';
	result.forEach(function (r) {
		var found = false, i = 0, j = 0;
		if (r.id !== rule) { return; }
		for (i = 0; i < selectors.length; i++) {
			found = false;
			for (j = 0; j  < r.nodes.length; j++) {
				if (arraysEqual(selectors[i], r.nodes[j].target)) { found = true; }
			}
			if (!found) {
				assert.equal(null, selectors[i], 'Expected node not found');
			}
		}

		for (i = 0; i < r.nodes.length; i++) {
			found = false;
			for (j = 0; j < selectors.length; j++) {
				if (arraysEqual(selectors[j], r.nodes[i].target)) { found = true; }
			}
			if (!found) {
				assert.equal(r.nodes[i].target, null, 'Unexpected node found');
			}
		}	
	});
}

function arraysEqual(a, b) {
	'use strict';
	if (a === b) return true;
	if (a === null || b === null) return false;
	if (a.length != b.length) return false;
	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}
