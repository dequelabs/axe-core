describe('axe.a11yCheck', function () {
	'use strict';

	describe('reporter', function () {
		var origReporters;
		var noop = function () {};

		beforeEach(function () {
			axe._load({});
			origReporters = window.reporters;
		});

		afterEach(function () {
			window.reporters = origReporters;
		});

		it('should throw if no audit is configured', function () {
			axe._audit = null;

			assert.throws(function () {
				axe.a11yCheck(document, {});
			}, Error, /^No audit configured/);
		});

		it('should allow for option-less invocation', function (done) {
			axe.a11yCheck(document, function (result) {
				assert.isObject(result);
				done();
			});
		});

		it('should work with performance logging enabled', function (done) {
			axe.a11yCheck(document, {performanceTimer: true}, function (result) {
				assert.isObject(result);
				done();
			});
		});

		it('sets v2 as the default reporter if audit.reporter is null', function (done) {
			var origRunRules = axe._runRules;

			axe._runRules = function (ctxt, opt) {
				assert.equal(opt.reporter, 'v2');
				axe._runRules = origRunRules;
				done();
			};

			axe._audit.reporter = null;
			axe.a11yCheck(document, noop);
		});

		it('uses the audit.reporter if no reporter is set in options', function (done) {
			var origRunRules = axe._runRules;

			axe._runRules = function (ctxt, opt) {
				assert.equal(opt.reporter, 'raw');
				axe._runRules = origRunRules;
				done();
			};
			axe._audit.reporter = 'raw';
			axe.a11yCheck(document, noop);
		});

		it('does not override if another reporter is set', function (done) {
			var origRunRules = axe._runRules;
			axe._runRules = function (ctxt, opt) {
				assert.equal(opt.reporter, 'raw');
				axe._runRules = origRunRules;
				done();
			};
			axe._audit.reporter = null;
			axe.a11yCheck(document, {reporter: 'raw'}, noop);
		});

	});
});