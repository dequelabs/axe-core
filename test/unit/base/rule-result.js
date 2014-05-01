/*global RuleResult */
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
		it('should push to details', function () {
			var result = new RuleResult({id: 'monkeys'}),
				checks = [{result: 'PASS', value: true}, {result: 'FAIL', value: true}, {result: 'PASS', value: true}],
				div = document.getElementById('fixture');

			result.addResults(div, checks);

			assert.deepEqual(result.details[0].node, new DqNode(div));
			assert.deepEqual(result.details[0].checks, checks);
			assert.deepEqual(result.details[0].result, 'FAIL');

		});

	});
});