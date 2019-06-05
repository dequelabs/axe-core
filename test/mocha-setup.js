/*global mocha, assert, Mocha*/
/*eslint no-unused-vars: 0*/
var mochaSetupOptions = {
	timeout: 20000,
	ui: 'bdd'
};

/**
 * Only override `reporter` for `headless` mode
 * - `isAxeHeadlessMode` is set in `build/test/headless.js`, when tests are executed in `puppeteer`
 */
if (window.isAxeHeadlessMode) {
	mochaSetupOptions.reporter = axeHeadlessModeReporter;
}

mocha.setup(mochaSetupOptions);
var assert = chai.assert;

/**
 * Custom mocha reporter, invoked when running in headless mode (eg: puppeteer)
 * @param {Object} runner mocha runner instance
 */
function axeHeadlessModeReporter(runner) {
	var indent = 0;
	var failedTests = [];

	Mocha.reporters.Base.call(this, runner);

	runner
		// 'run' hooks
		.once(Mocha.Runner.constants.EVENT_RUN_END, onEventRunEnd)
		// 'suite' hooks
		.on(Mocha.Runner.constants.EVENT_SUITE_BEGIN, onEventSuiteBegin)
		.on(Mocha.Runner.constants.EVENT_SUITE_END, decreaseIndent)
		// 'test' hooks
		.on(Mocha.Runner.constants.EVENT_TEST_BEGIN, increaseIndent)
		.on(Mocha.Runner.constants.EVENT_TEST_PASS, onEventTestPass)
		.on(Mocha.Runner.constants.EVENT_TEST_FAIL, onEventTestFail)
		.on(Mocha.Runner.constants.EVENT_TEST_PENDING, onEventTestPending)
		.on(Mocha.Runner.constants.EVENT_TEST_END, decreaseIndent);

	function onEventRunEnd() {
		var result = {
			stats: runner.stats,
			failedTests: failedTests
		};
		setResult(result);
	}

	function onEventSuiteBegin(suite) {
		increaseIndent();
		if (suite.fullTitle().trim().length) {
			console.log(getIndent() + 'Suite: ' + suite.fullTitle());
		}
	}

	function onEventTestPass(test) {
		console.log(getIndent() + 'Pass: ' + test.fullTitle());
	}

	function onEventTestFail(test, err) {
		failedTests.push(getTestData(test));
		console.log(
			getIndent() + 'Fail: ' + test.fullTitle() + ', Error: ' + err.message
		);
	}

	function onEventTestPending(test) {
		console.log(getIndent() + 'Pending: ' + test.fullTitle());
	}

	function increaseIndent() {
		indent++;
	}

	function decreaseIndent() {
		indent--;
	}

	function getIndent() {
		return Array(indent >= 0 ? indent : 0).join('  ');
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
}
