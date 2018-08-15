/* global axe, Promise */
describe('preload integration test', function() {
	'use strict';

	var origAxios;
	var origAuditRun;

	function overridedCheckEvaluateFn(node, options, virtualNode, context) {
		// populate the data here which is asserted in tests
		this.data(context);
		return true;
	}

	before(function(done) {
		function start() {
			// cache originals
			origAuditRun = axe._audit.run;
			if (axe.imports.axios) {
				origAxios = axe.imports.axios;
			}
			// load custom rule
			// load custom check
			// the evaluate in check sets the data object
			// which is used for assertion in tests below
			axe._load({
				rules: [
					{
						// this rule is not preload dependent
						// and can run immediately
						id: 'run-now-rule',
						selector: 'div#run-now-target',
						any: ['check-context-exists']
					},
					{
						// this rule requires preload
						// and will run after preload assets are ready
						id: 'run-later-rule',
						selector: 'div#run-later-target',
						any: ['check-context-has-assets'],
						preload: {
							assets: ['cssom']
						}
					}
				],
				checks: [
					{
						id: 'check-context-exists',
						evaluate: overridedCheckEvaluateFn
					},
					{
						id: 'check-context-has-assets',
						evaluate: overridedCheckEvaluateFn
					}
				]
			});
			// done
			done();
		}
		if (document.readyState !== 'complete') {
			window.addEventListener('load', start);
		} else {
			start();
		}
	});

	function createStub(shouldReject) {
		/**
		 * This is a simple override to stub `axe.imports.axios`, until the test-suite is enhanced.
		 * Did not use any library such as sinon for this, as sinon.stub have difficulties working under selenium webdriver
		 * Also a generic XHR override was overlooked under webdriver
		 */
		axe.imports.axios = function stubbedAxios() {
			return new Promise(function(resolve, reject) {
				if (shouldReject) {
					reject(new Error('Fake Error'));
				}
				resolve({
					data: 'body{overflow:auto;}'
				});
			});
		};
	}

	function restoreStub() {
		axe._audit.run = origAuditRun;
		if (origAxios) {
			axe.imports.axios = origAxios;
		}
	}

	function assertStylesheet(sheet, selectorText, cssText) {
		assert.isDefined(sheet);
		assert.property(sheet, 'cssRules');
		assert.equal(sheet.cssRules[0].selectorText, selectorText);
		assert.equal(sheet.cssRules[0].cssText.replace(/\s/g, ''), cssText);
	}

	beforeEach(function() {
		createStub();
	});

	afterEach(function() {
		restoreStub();
	});

	var shouldIt = window.PHANTOMJS ? it.skip : it;

	shouldIt(
		'ensure for custom rule/check which does not preload, the CheckResult does not have asset(cssom)',
		function(done) {
			axe.run(
				{
					runOnly: {
						type: 'rule',
						values: ['run-now-rule']
					},
					// run config asks to preload, but no rule mandates preload, so preload is skipped
					preload: {
						assets: ['cssom']
					}
				},
				function(err, res) {
					// we ensure preload was skipped by checking context does not have cssom in checks evaluate function
					assert.isNull(err);
					assert.isDefined(res);
					assert.property(res, 'passes');
					assert.lengthOf(res.passes, 1);

					var checkData = res.passes[0].nodes[0].any[0];
					assert.notProperty(checkData, 'cssom');
					done();
				}
			);
		}
	);

	shouldIt(
		'ensure for custom rule/check which requires preload, the CheckResult contains asset(cssom) and validate stylesheet',
		function(done) {
			axe.run(
				{
					runOnly: {
						type: 'rule',
						values: ['run-later-rule']
					},
					// run config asks to preload, and the rule requires a preload as well, context will be mutated with 'cssom' asset
					preload: {
						assets: ['cssom']
					}
				},
				function(err, res) {
					// we ensure preload was skipped by checking context does not have cssom in checks evaluate function
					assert.isNull(err);
					assert.isDefined(res);
					assert.property(res, 'passes');
					assert.lengthOf(res.passes, 1);

					var checkData = res.passes[0].nodes[0].any[0].data;
					assert.property(checkData, 'cssom');

					var cssom = checkData.cssom;
					assert.lengthOf(cssom, 3);

					var externalSheet = cssom.filter(function(s) {
						return s.isExternal;
					})[0].sheet;
					assertStylesheet(externalSheet, 'body', 'body{overflow:auto;}');

					var inlineStylesheet = cssom.filter(function(s) {
						return s.sheet.rules.length === 1 && !s.isExternal;
					})[0].sheet;
					assertStylesheet(
						inlineStylesheet,
						'.inline-css-test',
						'.inline-css-test{font-size:inherit;}'
					);

					done();
				}
			);
		}
	);
});
