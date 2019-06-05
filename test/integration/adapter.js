/*global mocha, Mocha */
(function() {
	'use strict';

	var failedTests = [];
	var runner = mocha.run();

	runner
		// 'run' hooks
		.once(Mocha.Runner.constants.EVENT_RUN_END, onEventRunEnd)
		// 'suite' hooks
		.on(Mocha.Runner.constants.EVENT_SUITE_BEGIN, onEventSuiteBegin)
		// 'test' hooks
		.on(Mocha.Runner.constants.EVENT_TEST_PASS, onEventTestPass)
		.on(Mocha.Runner.constants.EVENT_TEST_FAIL, onEventTestFail)
		.on(Mocha.Runner.constants.EVENT_TEST_PENDING, onEventTestPending);

	function onEventRunEnd() {
		var result = {
			stats: runner.stats,
			failedTests: failedTests
		};
		setResult(result);
	}

	function onEventSuiteBegin(suite) {
		if (suite.fullTitle().trim().length) {
			console.log('Suite: ' + suite.fullTitle());
		}
	}

	function onEventTestPass(test) {
		console.log('Pass: ' + test.fullTitle());
	}

	function onEventTestFail(test, err) {
		failedTests.push(getTestData(test));
		console.log('Fail: ' + test.fullTitle() + ', Error: ' + err.message);
	}

	function onEventTestPending(test) {
		console.log('Pending: ' + test.fullTitle());
	}

	function getTestData(test) {
		return {
			title: test.title,
			fullTitle: test.fullTitle(),
			duration: test.duration,
			err: getTestError(test.err)
		};
	}

	function getTestError(err) {
		if (!err) {
			return {};
		}
		var result = {};
		Object.getOwnPropertyNames(err).forEach(function(key) {
			result[key] = err[key];
		});
		return result;
	}

	function setResult(stats) {
		!window.__mochaResult__ && (window.__mochaResult__ = stats);
	}
})();
