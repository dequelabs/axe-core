
describe('utils.bubbleResult', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.bubbleResult);
	});

	it('should return NA with empty checks', function () {
		var result = utils.bubbleResult([]);
		assert.equal(result, 'NA');
	});

	it('should return when it sees FAIL', function () {
		var result = utils.bubbleResult([{result: 'PASS', value: true}, {result: 'FAIL', value: true}, {result: 'PASS', value: true}]);
		assert.equal(result, 'FAIL');
	});

	it('should return the highest warning level', function () {
		var result = utils.bubbleResult([{result: 'PASS', value: true}, {result: 'WARN', value: true}, {result: 'PASS', value: true}]);
		assert.equal(result, 'WARN');
	});

	it('should return PASS if there are no failures or warnings', function () {
		var result = utils.bubbleResult([{result: 'PASS', value: true}, {result: 'PASS', value: true}, {result: null}]);
		assert.equal(result, 'PASS');
	});

});