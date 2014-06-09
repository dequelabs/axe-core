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
			var	checks = [{type: 'PASS', result: true}, {type: 'PASS', result: true}, {type: 'PASS', result: true}];

			result.addResults(div, checks);

			assert.deepEqual(result.details[0].node, new DqNode(div));
			assert.deepEqual(result.details[0].checks, checks);
			assert.deepEqual(result.details[0].result, 'PASS');

		});
		it('should fail if all checks have result of FAIL', function () {
			var checks = [
				{type: 'PASS', result: false}, {type: 'PASS', result: false}, {type: 'PASS', result: false}
			];

			result.addResults(div, checks);
			assert.deepEqual(result.details[0].result, 'FAIL');

		});
		it('should pass if one check has result of PASS', function () {
			var checks = [
				{type: 'PASS', result: false},
				{type: 'PASS', result: true},
				{type: 'PASS', result: false}
			];

			result.addResults(div, checks);
			assert.deepEqual(result.details[0].result, 'PASS');
		});
		it('should fail if one failure check has result of FAIL', function () {
			var checks = [
				{type: 'PASS', result: true}, {type: 'PASS', result: true},
				{type: 'FAIL', result: true}
			];
			result.addResults(div, checks);
			assert.deepEqual(result.details[0].result, 'FAIL');
		});
	});
});