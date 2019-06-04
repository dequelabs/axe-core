/*global mocha, assert, Mocha*/
/*eslint no-unused-vars: 0*/
var isBrowser = new Function(
	'try {return this===window;}catch(e){ return false;}'
)();

var mochaSetupOptions = {
	timeout: 20000,
	ui: 'bdd'
};
if (isBrowser) {
	mochaSetupOptions.reporter = axeHeadlessReporter;
}

mocha.setup(mochaSetupOptions);
var assert = chai.assert;

/**
 * Custom mocha reporter, invoked when running in headless mode (eg: puppeteer)
 * @param {Object} runner mocha runner instance
 */
function axeHeadlessReporter(runner) {
	var indent = 0;

	Mocha.reporters.Base.call(this, runner);

	runner
		// 'run' hooks
		.once(Mocha.Runner.constants.EVENT_RUN_BEGIN, onEventRunBegin)
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

	function onEventRunBegin() {
		write('Axe Custom Mocha Reporter - Start\n');
	}

	function onEventRunEnd() {
		write(
			'Axe Custom Mocha Reporter - End.\n\nStats: ' +
				runner.stats.tests +
				'/' +
				runner.total +
				' (' +
				runner.stats.passes +
				' passed,  ' +
				runner.stats.failures +
				' failed).'
		);
	}

	function onEventSuiteBegin(suite) {
		increaseIndent();
		if (suite.fullTitle().trim().length) {
			write(getIndent() + 'Suite: ' + suite.fullTitle());
		} else {
			write('Suite: Axe Tests');
		}
	}

	function onEventTestPass(test) {
		write(getIndent() + 'Pass: ' + test.fullTitle());
	}

	function onEventTestFail(test, err) {
		write(
			getIndent() + 'Fail: ' + test.fullTitle() + ', Error: ' + err.message
		);
	}
	function onEventTestPending(test) {
		write(getIndent() + 'Pending: ' + test.fullTitle());
	}

	function increaseIndent() {
		indent++;
	}

	function decreaseIndent() {
		indent--;
	}

	function getIndent() {
		return Array(indent).join('  ');
	}

	function write(str) {
		console.log(str);
		// todo:jey
		// process.stdout.write(str)
	}
}
