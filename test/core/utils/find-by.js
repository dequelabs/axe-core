describe('axe.utils.findBy', function () {
	'use strict';

	it('should find the first matching object', function () {
		var array = [{
				id: 'monkeys',
				foo: 'bar'
			}, {
				id: 'bananas'
			}, {
				id: 'monkeys',
				bar: 'baz'
			}];

		assert.equal(axe.utils.findBy(array, 'id', 'monkeys'), array[0]);
	});

	it('should return undefined with no match', function () {
		var array = [{
				id: 'monkeys',
				foo: 'bar'
			}, {
				id: 'bananas'
			}, {
				id: 'monkeys',
				bar: 'baz'
			}];

		assert.isUndefined(axe.utils.findBy(array, 'id', 'macaque'));

	});

	it('should not throw if passed falsey first parameter', function () {
		assert.isUndefined(axe.utils.findBy(null, 'id', 'macaque'));
	});

});