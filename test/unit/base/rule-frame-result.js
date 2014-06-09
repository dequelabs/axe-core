/*global RuleFrameResult, DqNode */
describe('RuleFrameResult', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(RuleFrameResult);
	});

	it('should have an empty array for details', function () {
		assert.deepEqual(new RuleFrameResult({id: 'monkeys'}).details, []);
	});

	it('should grab id from passed in rule', function () {
		var result = new RuleFrameResult({id: 'monkeys'});
		assert.equal(result.id, 'monkeys');
	});

	describe('addResults', function () {
		it('should push to details', function () {
			var result = new RuleFrameResult({id: 'monkeys'}),
				checks = [{result: 'PASS'}, {result: 'FAIL'}, {result: 'PASS'}],
				div = document.getElementById('fixture');

			result.addResults(div, checks);

			assert.deepEqual(result.details[0].node, new DqNode(div));
			assert.deepEqual(result.details[0].checks, checks);
		});

	});
});