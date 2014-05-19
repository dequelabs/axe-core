describe('utils.findMatchingOption', function () {
	'use strict';
	it('should return the array entry that has an id attribute that matches the first argument', function () {
		var option;

		option = utils.findMatchingOption('key', [{id: 'nomatch'}, {id: 'nomatch2'}, {id: 'key', data: 'monkeys'}]);
		assert.ok(option);
		assert.equal(option.id, 'key');
		assert.equal(option.data, 'monkeys');
	});
	it('should return undefined if the id does not exist', function () {
		var option;

		option = utils.findMatchingOption('key', [{id: 'nomatch'}, {id: 'nomatch2'}]);
		assert.isUndefined(option);
	});
	it('should not throw if passed in undefined', function () {
		assert.doesNotThrow(function () {
			utils.findMatchingOption('key');
		});
	});
});
