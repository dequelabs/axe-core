describe('axe.utils.aggregateRule', function() {
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
		assert.isFunction(axe.utils.aggregateRule);
	});

	it('Should be `inapplicable` when no results are given', function () {
		var ruleResult = axe.utils.aggregateRule( createTestResults(
			{}, {}
		));

		assert.equal(ruleResult.result, INAPPLICABLE);
		assert.lengthOf(ruleResult.inapplicable, 2);
	});

	it('should assign FAIL to ruleResult over PASS', function() {
		var ruleResult = axe.utils.aggregateRule( createTestResults(
			{ all: false },
			{ all: true },
			{ all: true }
		));
		assert.equal(ruleResult.result, FAIL);
		assert.lengthOf(ruleResult.violations, 1);
		assert.lengthOf(ruleResult.passes, 2);
	});

	it('should assign FAIL to ruleResult over CANTTELL', function() {
		var ruleResult = axe.utils.aggregateRule( createTestResults(
			{ all: false },
			{ all: 0 },
			{ all: true }
		));
		assert.equal(ruleResult.result, FAIL);
		assert.lengthOf(ruleResult.violations, 1);
		assert.lengthOf(ruleResult.incomplete, 1);
		assert.lengthOf(ruleResult.passes, 1);
	});

	it('should assign PASS to ruleResult if there are only passing checks', function() {
		var ruleResult = axe.utils.aggregateRule( createTestResults(
			{ all: true },
			{ all: true },
			{ all: true }
		));
		assert.equal(ruleResult.result, PASS);
		assert.lengthOf(ruleResult.passes, 3);
		assert.lengthOf(ruleResult.violations, 0);

	});

	it('should assign FAIL if there are no passing anys checks', function() {
		var ruleResult = axe.utils.aggregateRule( createTestResults(
			{ any: false },
			{ any: false },
			{ any: false }
		));
		assert.equal(ruleResult.result, FAIL);
		assert.lengthOf(ruleResult.violations, 3);
		assert.lengthOf(ruleResult.passes, 0);
	});

	it('should assign CANTTELL over PASS', function() {
		var ruleResult = axe.utils.aggregateRule( createTestResults(
			{ all: true },
			{ all: 0 },
			{ all: 0 }
		));
		assert.equal(ruleResult.result, CANTTELL);
		assert.lengthOf(ruleResult.incomplete, 2);
		assert.lengthOf(ruleResult.passes, 1);
	});

	it('should raise the highest "raisedMetadata" on failing checks', function() {
		var ruleResult = axe.utils.aggregateRule( createTestResults({
				none: { result: true, impact: 'moderate' },
				any: { result: true, impact: 'minor' },
				all: [
					{ result: true, impact: 'critical' },
					{ result: false, impact: 'serious'}
				]
			},
			{ none: { result: false, impact: 'critical' }},
			{ none: { result: false, impact: 'critical' }}
		));
		assert.equal(ruleResult.impact, 'serious');
		assert.equal(ruleResult.violations[0].impact, 'serious');
		assert.isNull(ruleResult.passes[0].impact);
		assert.isNull(ruleResult.passes[1].impact);
	});
});
