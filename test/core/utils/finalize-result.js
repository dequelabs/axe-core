describe('axe.utils.finalizeRuleResult', function() {
	'use strict';
	var FAIL = 'failed';
	var PASS = 'passed';
	var CANTTELL = 'cantTell';
	var INAPPLICABLE = 'inapplicable';

	// create an array of check results, padding input with defaults and
	// wrapping arrays where required
	function createTestResults() {
		var args = [].slice.call(arguments);
		return args.map(function (node) {
			['any','all','none']
			.forEach(function (type) {
				if (typeof node[type] === 'undefined') {
					node[type] = [];
				} else if (Array.isArray(node[type])) {
					node[type] = node[type].map(function (val) {
						if (typeof val !== 'object') {
							return { result: val };
						} else {
							return val;
						}
					});
				} else {
					if (typeof node[type] !== 'object') {
						node[type] = { result: node[type] };
					}
					node[type] = [ node[type] ];
				}
			});
			return node;
		});
	}

	beforeEach(function() {
		axe._load({});
	});

	it('should be a function', function() {
		assert.isFunction(axe.utils.finalizeRuleResult);
	});

	it('Should be `inapplicable` when no results are given', function () {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults({}, {})
		});
		assert.equal(ruleResult.result, INAPPLICABLE);
		assert.lengthOf(ruleResult.inapplicable, 2);
	});

	it('should FAIL ruleResult if a failing (return true) none is found', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ none: false },
					{ none: true },
					{ none: [true, undefined] })
		});
		assert.equal(ruleResult.result, FAIL);
		assert.lengthOf(ruleResult.violations, 2);
		assert.lengthOf(ruleResult.passes, 1);
	});

	it('should assign FAIL to ruleResult over PASS', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ none: false },
					{ any: true },
					{ none: true })
		});
		assert.equal(ruleResult.result, FAIL);
		assert.lengthOf(ruleResult.violations, 1);
		assert.lengthOf(ruleResult.passes, 2);
	});

	it('should assign PASS to ruleResult if there are only passing anys', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ none: false },
					{ any: true },
					{ any: [undefined, true] })
		});
		assert.equal(ruleResult.result, PASS);
		assert.lengthOf(ruleResult.passes, 3);
		assert.lengthOf(ruleResult.violations, 0);

	});

	it('should assign FAIL if there are no passing anys', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ any: false },
					{ any: false },
					{ any: false })
		});
		assert.equal(ruleResult.result, FAIL);
		assert.lengthOf(ruleResult.violations, 3);
		assert.lengthOf(ruleResult.passes, 0);

	});

	it('should assign FAIL if there is a single non-passing all', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ any: false },
					{ any: false, all: [false, true, undefined] },
					{ any: [true, undefined] })
		});
		assert.equal(ruleResult.result, FAIL);
		assert.lengthOf(ruleResult.violations, 2);
		assert.lengthOf(ruleResult.passes, 1);

	});

	it('should PASS if there are only falsey nones', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ none: false },
					{ none: false },
					{ none: false })
		});
		assert.equal(ruleResult.result, PASS);
		assert.lengthOf(ruleResult.violations, 0);
		assert.lengthOf(ruleResult.passes, 3);
	});

	it('sets result=cantTell when result is undefined for none', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ none: [false] },
					{ none: [undefined, false] },
					{ none: [undefined] })
		});
		assert.equal(ruleResult.result, CANTTELL);
		assert.lengthOf(ruleResult.cantTell, 2);
		assert.lengthOf(ruleResult.passes, 1);
	});

	it('sets result=cantTell when result is undefined for all', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ all: [true] },
					{ all: [undefined, true] },
					{ all: [undefined] })
		});
		assert.equal(ruleResult.result, CANTTELL);
		assert.lengthOf(ruleResult.cantTell, 2);
		assert.lengthOf(ruleResult.passes, 1);
	});

	it('sets result=cantTell when result is undefined for any', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ any: [undefined, true] },
					{ any: [undefined, false] },
					{ any: [undefined] })
		});
		assert.equal(ruleResult.result, CANTTELL);
		assert.lengthOf(ruleResult.cantTell, 2);
		assert.lengthOf(ruleResult.passes, 1);
	});

	it('sets result=cantTell when result is not a boolean', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults(
					{ all: {result: undefined }},
					{ all: {result: null }},
					{ all: {result: 0 }},
					{ all: {result: "true" }},
					{ all: {result: {} }},
					{ all: {result: NaN }})
		});
		assert.equal(ruleResult.result, CANTTELL);
		assert.lengthOf(ruleResult.passes, 0);
		assert.lengthOf(ruleResult.violations, 0);
	});

	it('should raise the highest "raisedMetadata" on failing checks', function() {
		var ruleResult = axe.utils.finalizeRuleResult({
			pageLevel: false,
			nodes: createTestResults({
					none: { result: true, impact: 'moderate' },
						any: { result: true, impact: 'minor' },
						all: [{ result: true, impact: 'critical' },
							{ result: false, impact: 'serious'}]
					},
					{ none: { result: false, impact: 'critical' }},
					{ none: { result: false, impact: 'critical' }})
		});
		assert.equal(ruleResult.impact, 'serious');
		assert.equal(ruleResult.violations[0].impact, 'serious');
		assert.isUndefined(ruleResult.passes[0].impact);
		assert.isUndefined(ruleResult.passes[1].impact);
	});

});
