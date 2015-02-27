
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
				assert.deepEqual(detail, ruleResult.nodes[i]);
				return i++;
			};
			var i = 0;
			var ruleResult = {
				pageLevel: false,
				nodes: [{
					all: [{monkeys: 'bananas'}],
					any: [],
					none: []
				}, {
					all: [{rabbits: 'cabbage'}],
					any: [],
					none: []
				}, {
					all: [{fox: 'rabbit'}],
					any: [],
					none: []
				}]
			};
			utils.calculateRuleResult(ruleResult);

			assert.equal(i, 3);
			assert.equal(ruleResult.nodes[0].result, 0);
			assert.equal(ruleResult.nodes[1].result, 1);
			assert.equal(ruleResult.nodes[2].result, 2);


			window.calculateCheckResult = orig;
		});

		it('should FAIL ruleResult if a failing (return true) none is found', function () {
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should assign PASS to ruleResult if there are only passing anys', function () {
			var ruleResult = {
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'PASS');

		});

		it('should assign FAIL if there are no passing anys', function () {
			var ruleResult = {
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should assign FAIL if there is a single non-passing all', function () {
			var ruleResult = {
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should PASS if there are no PASSes and only falsey FAILs', function () {
			var ruleResult = {
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'PASS');

		});

		it('should raise the highest "raisedMetadata" on failing checks', function () {
			var ruleResult = {
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.impact, 'serious');
			assert.equal(ruleResult.nodes[0].impact, 'serious');
			assert.isUndefined(ruleResult.nodes[1].impact);
			assert.isUndefined(ruleResult.nodes[2].impact);

		});

	});

	describe('page level', function () {

		it('should concatenate all failing checks before passing to calculateCheckResult', function () {

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
					all: [{ monkeys: 'all:bananas', result: false }],
					any: [{ monkeys: 'any:bananas', result: false }],
					none: [{ monkeys: 'none:bananas', result: true }]
				}, {
					any: [{ rabbits: 'any:cabbage', result: false }],
					all: [{ rabbits: 'all:cabbage', result: false }],
					none: [{ rabbits: 'none:cabbage', result: true }]
				}, {
					none: [{ fox: 'none:rabbit', result: true }],
					any: [{ fox: 'any:rabbit', result: false }],
					all: [{ fox: 'all:rabbit', result: false }]
				}]
			};
			var allChecks = {
				none: ruleResult.nodes[0].none.concat(ruleResult.nodes[1].none).concat(ruleResult.nodes[2].none),
				all: ruleResult.nodes[0].all.concat(ruleResult.nodes[1].all).concat(ruleResult.nodes[2].all),
				any: ruleResult.nodes[0].any.concat(ruleResult.nodes[1].any).concat(ruleResult.nodes[2].any)
			};

			utils.calculateRuleResult(ruleResult);

			assert.equal(i, 1, 'called once');
			assert.equal(ruleResult.result, 'okie');


			window.calculateCheckResult = orig;
		});


		it('should FAIL ruleResult if a failing (return true) none is found', function () {
			var ruleResult = {
				pageLevel: true,
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
				pageLevel: true,
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should assign PASS to ruleResult if there are only passing anys', function () {
			var ruleResult = {
				pageLevel: true,
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'PASS');

		});

		it('should assign FAIL if there are no passing anys', function () {
			var ruleResult = {
				pageLevel: true,
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should assign FAIL if there is a single non-passing all', function () {
			var ruleResult = {
				pageLevel: true,
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'FAIL');

		});

		it('should PASS if there are no PASSes and only falsey FAILs', function () {
			var ruleResult = {
				pageLevel: true,
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.result, 'PASS');

		});

		it('should raise the highest "raisedMetadata" on failing checks', function () {
			var ruleResult = {
				pageLevel: true,
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
			};
			utils.calculateRuleResult(ruleResult);
			assert.equal(ruleResult.impact, 'serious');
			assert.isUndefined(ruleResult.nodes[0].impact);
			assert.isUndefined(ruleResult.nodes[1].impact);
			assert.isUndefined(ruleResult.nodes[2].impact);

		});

	});

});
