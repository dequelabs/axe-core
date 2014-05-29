/*global RuleResult, DqNode */
describe('RuleResult', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(RuleResult);
	});

	it('should have an empty array for details', function () {
		assert.deepEqual(new RuleResult({id: 'monkeys'}).details, []);
	});

	it('should grab id from passed in rule', function () {
		var result = new RuleResult({id: 'monkeys'});
		assert.equal(result.id, 'monkeys');
	});

	describe('addResults', function () {
		var result, div;
		beforeEach(function () {
			result = new RuleResult({id: 'monkeys'});
			div = document.getElementById('fixture');
		});
		it('should push to details', function () {
			var	checks = [{result: 'PASS', value: true}, {result: 'PASS', value: true}, {result: 'PASS', value: true}];

			result.addResults(div, checks);

			assert.deepEqual(result.details[0].node, new DqNode(div));
			assert.deepEqual(result.details[0].checks, checks);
			assert.equal(result.details[0].value, true);
			assert.deepEqual(result.details[0].result, 'PASS');

		});
		it('should fail if all checks have value of false', function () {
			var checks = [{result: 'PASS', value: false}, {result: 'PASS', value: false}, {result: 'PASS', value: false}];

			result.addResults(div, checks);

			assert.equal(result.details[0].value, false);
			assert.deepEqual(result.details[0].result, 'FAIL');

		});
		it('should pass if one check has value of true', function () {
			var checks = [{result: 'PASS', value: false}, {result: 'PASS', value: true}, {result: 'PASS', value: false}];

			result.addResults(div, checks);

			assert.equal(result.details[0].value, true);
			assert.deepEqual(result.details[0].result, 'PASS');

		});

	});
});