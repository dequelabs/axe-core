
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

	/*

function calculateNodeRuleResult(ruleResult) {
	'use strict';

	var calculatedResult;
	ruleResult.details.forEach(function (detail) {
		var result = utils.calculateCheckResult(detail.checks);
		detail.result = result;
		if (calculatedResult !== dqre.constants.type.FAIL) {
			calculatedResult = result;
		}
	});

	if (calculatedResult) {
		ruleResult.result = calculatedResult;
	}

} */

	describe('node level', function () {

		it('should iterate details calling calculateCheckResult on each, assigning output to result', function () {

			var orig = window.calculateCheckResult;
			window.calculateCheckResult = function (checks) {
				assert.equal(checks, ruleResult.details[i].checks);
				return i++;
			};
			var i = 0;
			var ruleResult = {
				pageLevel: false,
				details: [{
					checks: [{monkeys: 'bananas'}]
				}, {
					checks: [{rabbits: 'cabbage'}]
				}, {
					checks: [{fox: 'rabbit'}]
				}]
			};
			utils.calculateRuleResult(ruleResult);

			assert.equal(i, 3);
			assert.equal(ruleResult.details[0].result, 0);
			assert.equal(ruleResult.details[1].result, 1);
			assert.equal(ruleResult.details[2].result, 2);


			window.calculateCheckResult = orig;
		});

		it('should assign FAIL to ruleResult if a FAIL is found', function () {
			var ruleResult = {
				pageLevel: false,
				details: [{
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
				pageLevel: false,
				details: [{
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
				details: [{
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
				details: [{
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
				details: [{
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
				details: [{
					checks: [{monkeys: 'bananas'}]
				}, {
					checks: [{rabbits: 'cabbage'}]
				}, {
					checks: [{fox: 'rabbit'}]
				}]
			};
			var allChecks = ruleResult.details[0].checks.concat(ruleResult.details[1].checks).concat(ruleResult.details[2].checks);
			utils.calculateRuleResult(ruleResult);

			assert.equal(i, 1, 'called once');
			assert.equal(ruleResult.result, 'okie');


			window.calculateCheckResult = orig;
		});

		it('should assign FAIL to ruleResult if a FAIL is found', function () {
			var ruleResult = {
				pageLevel: true,
				details: [{
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
				details: [{
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
				details: [{
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
				details: [{
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
				details: [{
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