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
});