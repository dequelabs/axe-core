
describe('utils.calculateRuleResult', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.calculateRuleResult);
	});

	it('should call calculatePageRuleResult if pageLevel == true', function () {
		var orig = window.calculatePageRuleResult;
		var success = false;

		window.calculatePageRuleResult = function (rr) {
			assert.equal(rr, ruleResult);
			success = true;
		};
		var ruleResult = {
				pageLevel: true
			};

		utils.calculateRuleResult(ruleResult);
		assert.isTrue(success);


		window.calculatePageRuleResult = orig;
	});

	it('should call calculateNodeRuleResult if pageLevel != true', function () {
		var orig = window.calculateNodeRuleResult;
		var success = false;

		window.calculateNodeRuleResult = function (rr) {
			assert.equal(rr, ruleResult);
			success = true;
		};
		var ruleResult = {
				pageLevel: false
			};

		utils.calculateRuleResult(ruleResult);
		assert.isTrue(success);


		window.calculateNodeRuleResult = orig;
	});

	describe('node level', function () {

		it('should iterate nodes calling calculateCheckResult on each, assigning output to result', function () {

			var orig = window.calculateCheckResult;
			window.calculateCheckResult = function (detail) {
				assert.equal(detail, ruleResult.nodes[i]);
				return i++;
			};
			var i = 0;
			var ruleResult = {
				pageLevel: false,
				nodes: [{
					all: [{monkeys: 'bananas'}]
				}, {
					all: [{rabbits: 'cabbage'}]
				}, {
					all: [{fox: 'rabbit'}]
				}]
			};
			utils.calculateRuleResult(ruleResult);

			assert.equal(i, 3);
			assert.equal(ruleResult.nodes[0].result, 0);
			assert.equal(ruleResult.nodes[1].result, 1);
			assert.equal(ruleResult.nodes[2].result, 2);


			window.calculateCheckResult = orig;
		});

		it('should assign FAIL to ruleResult if a FAIL is found', function () {
			var ruleResult = {
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should assign FAIL to ruleResult over PASS', function () {
			var ruleResult = {
				pageLevel: false,
				nodes: [{
					checks: [{ type: 'FAIL', result: false }]
				}, {
					checks: [{ type: 'PASS', result: true }]
				}, {
					checks: [{ type: 'FAIL', result: true }]
				}]
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should assign PASS to ruleResult over if theres a PASS', function () {
			var ruleResult = {
				pageLevel: false,
				nodes: [{
					checks: [{ type: 'FAIL', result: false }]
				}, {
					checks: [{ type: 'PASS', result: true }]
				}, {
					checks: [{ type: 'FAIL', result: false }]
				}]
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'PASS');

		});

		it('should assign FAIL if there are PASSes that none pass', function () {
			var ruleResult = {
				pageLevel: false,
				nodes: [{
					checks: [{ type: 'PASS', result: false }]
				}, {
					checks: [{ type: 'PASS', result: false }]
				}, {
					checks: [{ type: 'PASS', result: false }]
				}]
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should PASS if there are no PASSes and only falsey FAILs', function () {
			var ruleResult = {
				pageLevel: false,
				nodes: [{
					checks: [{ type: 'FAIL', result: false }]
				}, {
					checks: [{ type: 'FAIL', result: false }]
				}, {
					checks: [{ type: 'FAIL', result: false }]
				}]
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'PASS');

		});

	});

	describe('page level', function () {

		it('should concanenate all checks before passing to calculateCheckResult', function () {

			var orig = window.calculateCheckResult;
			window.calculateCheckResult = function (checks) {
				assert.deepEqual(checks, allChecks);
				i++;
				return 'okie';
			};
			var i = 0;
			var ruleResult = {
				pageLevel: true,
				nodes: [{
					checks: [{monkeys: 'bananas'}]
				}, {
					checks: [{rabbits: 'cabbage'}]
				}, {
					checks: [{fox: 'rabbit'}]
				}]
			};
			var allChecks = ruleResult.nodes[0].checks.concat(ruleResult.nodes[1].checks).concat(ruleResult.nodes[2].checks);
			utils.calculateRuleResult(ruleResult);

			assert.equal(i, 1, 'called once');
			assert.equal(ruleResult.result, 'okie');


			window.calculateCheckResult = orig;
		});

		it('should assign FAIL to ruleResult if a FAIL is found', function () {
			var ruleResult = {
				pageLevel: true,
				nodes: [{
					checks: [{ type: 'FAIL', result: false }]
				}, {
					checks: [{ type: 'FAIL', result: true }]
				}, {
					checks: [{ type: 'FAIL', result: true }]
				}]
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should assign FAIL to ruleResult over PASS', function () {
			var ruleResult = {
				pageLevel: true,
				nodes: [{
					checks: [{ type: 'FAIL', result: false }]
				}, {
					checks: [{ type: 'PASS', result: true }]
				}, {
					checks: [{ type: 'FAIL', result: true }]
				}]
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should assign PASS to ruleResult over if theres a PASS', function () {
			var ruleResult = {
				pageLevel: true,
				nodes: [{
					checks: [{ type: 'FAIL', result: false }]
				}, {
					checks: [{ type: 'PASS', result: true }]
				}, {
					checks: [{ type: 'FAIL', result: false }]
				}]
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'PASS');

		});

		it('should assign FAIL if there are PASSes that none pass', function () {
			var ruleResult = {
				pageLevel: true,
				nodes: [{
					checks: [{ type: 'PASS', result: false }]
				}, {
					checks: [{ type: 'PASS', result: false }]
				}, {
					checks: [{ type: 'PASS', result: false }]
				}]
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should PASS if there are no PASSes and only falsey FAILs', function () {
			var ruleResult = {
				pageLevel: true,
				nodes: [{
					checks: [{ type: 'FAIL', result: false }]
				}, {
					checks: [{ type: 'FAIL', result: false }]
				}, {
					checks: [{ type: 'FAIL', result: false }]
				}]
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'PASS');

		});
	});

});

describe('utils.isCheckFailing', function () {
	'use strict';

	it('should return true if type == FAIL and result is truthy', function () {
		assert.isTrue(utils.isCheckFailing({
			type: 'FAIL',
			result: 'hehe'
		}));
		assert.isTrue(utils.isCheckFailing({
			type: 'FAIL',
			result: 1
		}));
		assert.isTrue(utils.isCheckFailing({
			type: 'FAIL',
			result: true
		}));
	});

	it('should return true if type == PASS and result is falsey', function () {
		assert.isTrue(utils.isCheckFailing({
			type: 'PASS',
			result: 0
		}));

		assert.isTrue(utils.isCheckFailing({
			type: 'PASS',
			result: null
		}));

		assert.isTrue(utils.isCheckFailing({
			type: 'PASS',
			result: false
		}));

		assert.isTrue(utils.isCheckFailing({
			type: 'PASS',
			result: ''
		}));
	});


	it('should return false if type == FAIL and result is falsey', function () {
		assert.isFalse(utils.isCheckFailing({
			type: 'FAIL',
			result: 0
		}));

		assert.isFalse(utils.isCheckFailing({
			type: 'FAIL',
			result: null
		}));

		assert.isFalse(utils.isCheckFailing({
			type: 'FAIL',
			result: false
		}));

		assert.isFalse(utils.isCheckFailing({
			type: 'FAIL',
			result: ''
		}));
	});

	it('should return false if type == PASS and result is truthy', function () {
		assert.isFalse(utils.isCheckFailing({
			type: 'PASS',
			result: 'hehe'
		}));
		assert.isFalse(utils.isCheckFailing({
			type: 'PASS',
			result: 1
		}));
		assert.isFalse(utils.isCheckFailing({
			type: 'PASS',
			result: true
		}));
	});

});
