
describe('axe.utils.finalizeRuleResult', function () {
	'use strict';

	beforeEach(function () {
		axe._load({});
	});

	it('should be a function', function () {
		assert.isFunction(axe.utils.finalizeRuleResult);
	});

	it('should FAIL ruleResult if a failing (return true) none is found', function () {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: [{
				none: [{ result: false }],
				all: [],
				any: []
			}, {
				none: [{ result: true }],
				all: [],
				any: []
			}, {
				none: [{ result: true }],
				all: [],
				any: []
			}]
		});
		assert.equal(ruleResult.result, 'FAIL');
		assert.lengthOf(ruleResult.violations, 2);
		assert.lengthOf(ruleResult.passes, 1);

	});

	it('should assign FAIL to ruleResult over PASS', function () {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: [{
				none: [{ result: false }],
				any: [],
				all: []
			}, {
				none: [],
				any: [{ result: true }],
				all: []
			}, {
				none: [{ result: true }],
				any: [],
				all: []
			}]
		});
		assert.equal(ruleResult.result, 'FAIL');
		assert.lengthOf(ruleResult.violations, 1);
		assert.lengthOf(ruleResult.passes, 2);

	});

	it('should assign PASS to ruleResult if there are only passing anys', function () {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: [{
				none: [{ result: false }],
				any: [],
				all: []
			}, {
				any: [{ result: true }],
				all: [],
				none: []
			}, {
				none: [{ result: false }],
				any: [],
				all: []
			}]
		});
		assert.equal(ruleResult.result, 'PASS');
		assert.lengthOf(ruleResult.passes, 3);
		assert.lengthOf(ruleResult.violations, 0);

	});

	it('should assign FAIL if there are no passing anys', function () {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: [{
				any: [{ result: false }],
				all: [],
				none: []
			}, {
				any: [{ result: false }],
				all: [],
				none: []
			}, {
				any: [{ result: false }],
				all: [],
				none: []
			}]
		});
		assert.equal(ruleResult.result, 'FAIL');
		assert.lengthOf(ruleResult.violations, 3);
		assert.lengthOf(ruleResult.passes, 0);

	});

	it('should assign FAIL if there is a single non-passing all', function () {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: [{
				any: [{ result: false }],
				all: [],
				none: []
			}, {
				any: [{ result: false }],
				all: [{ result: false }, { result: true }],
				none: []
			}, {
				any: [{ result: true }],
				all: [],
				none: []
			}]
		});
		assert.equal(ruleResult.result, 'FAIL');
		assert.lengthOf(ruleResult.violations, 2);
		assert.lengthOf(ruleResult.passes, 1);

	});

	it('should PASS if there are only falsey nones', function () {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: [{
				none: [{ result: false }],
				any: [],
				all: []
			}, {
				none: [{ result: false }],
				any: [],
				all: []
			}, {
				none: [{ result: false }],
				any: [],
				all: []
			}]
		});
		assert.equal(ruleResult.result, 'PASS');
		assert.lengthOf(ruleResult.violations, 0);
		assert.lengthOf(ruleResult.passes, 3);

	});

	it('should raise the highest "raisedMetadata" on failing checks', function () {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: [{
				none: [{
					result: true,
					impact: 'moderate'
				}],
				any: [{
					result: true,
					impact: 'minor'
				}],
				all: [{
					result: true,
					impact: 'critical'
				}, {
					result: false,
					impact: 'serious'
				}]
			}, {
				none: [{
					result: false,
					impact: 'critical'
				}],
				any: [],
				all: []
			}, {
				none: [{
					result: false,
					impact: 'critical'
				}],
				any: [],
				all: []
			}]
		});
		assert.equal(ruleResult.impact, 'serious');
		assert.equal(ruleResult.violations[0].impact, 'serious');
		assert.isUndefined(ruleResult.passes[0].impact);
		assert.isUndefined(ruleResult.passes[1].impact);

	});
});
