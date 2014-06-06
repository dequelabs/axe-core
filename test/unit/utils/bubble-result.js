
describe('utils.bubbleCheckResult', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.bubbleCheckResult);
	});

	it('should return result: NA with empty checks', function () {
		var result = utils.bubbleCheckResult([]);
		assert.deepEqual(result, 'NA');
	});

	it('should return FAIL when there are passes and failures', function () {
		var result = utils.bubbleCheckResult([
				{type: 'PASS', result: true},
				{type: 'FAIL', result: true},
				{type: 'PASS', result: true}
			]);
		assert.equal(result, 'FAIL');
	});

	it('should return PASS if there are passes and no failures', function () {
		var result = utils.bubbleCheckResult([
			{type: 'PASS', result: true}, {type: 'PASS', result: true}
		]);
		assert.equal(result, 'PASS');
	});

	it('should return PASS if there are no passes and no failed failures', function () {
		var result = utils.bubbleCheckResult([
			{type: 'PASS', result: true}, {type: 'PASS', result: true},
			{type: 'FAIL', result: false}
		]);
		assert.equal(result, 'PASS');
	});

	it('should return FAIL if there are no passes', function () {
		var result = utils.bubbleCheckResult([
			{type: 'PASS', result: false}, {type: 'PASS', result: false}
		]);
		assert.equal(result, 'FAIL');
	});

	it('should return PASS if there are no failures', function () {
		var result = utils.bubbleCheckResult([
			{type: 'FAIL', result: false}, {type: 'FAIL', result: false}
		]);
		assert.equal(result, 'PASS');
	});
	it('should return FAIL if there are only failures', function () {
		var result = utils.bubbleCheckResult([
			{type: 'FAIL', result: false},
			{type: 'FAIL', result: true}
		]);
		assert.equal(result, 'FAIL');
	});
});

describe('utils.bubbleRuleResult', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.bubbleRuleResult);
	});

	it('should return result: NA with empty checks', function () {
		var result = utils.bubbleRuleResult([]);
		assert.deepEqual(result, 'NA');
	});

	it('should return PASS with only one pass', function () {
		var result = utils.bubbleRuleResult([{result: 'PASS'}]);
		assert.equal(result, 'PASS');
	});
	it('should return PASS with only passes', function () {
		var result = utils.bubbleRuleResult([
			{result: 'PASS'}, {result: 'PASS'}, {result: 'PASS'}
		]);
		assert.equal(result, 'PASS');
	});
	it('should return FAIL with a only one fail', function () {
		var result = utils.bubbleRuleResult([
			{result: 'FAIL'}
		]);
		assert.equal(result, 'FAIL');
	});
	it('should return FAIL with only fails', function () {
		var result = utils.bubbleRuleResult([
			{result: 'FAIL'}, {result: 'FAIL'}
		]);
		assert.equal(result, 'FAIL');
	});
	it('should return FAIL with one fail', function () {
		var result = utils.bubbleRuleResult([
			{result: 'PASS'}, {result: 'PASS'}, {result: 'PASS'},
			{result: 'FAIL'}
		]);
		assert.equal(result, 'FAIL');
	});
});
