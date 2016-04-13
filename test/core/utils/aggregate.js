describe('aggregate', function () {
	'use strict';

	var map = [
		'youngling',
		'padawan',
		'knight',
		'master',
		'grand master'
	];

	var values = ['knight', 'master', 'padawan'];

	it('takes a map, values array and initial value', function () {
		assert.isFunction(axe.utils.aggregate);
		assert.lengthOf(axe.utils.aggregate, 3);

		assert.doesNotThrow(function () {
			axe.utils.aggregate(map, values, 'youngling');
		});
	});

	it('does not change the values array', function () {
		var copy = [].concat(values);
		axe.utils.aggregate(map, values, 'youngling');
		assert.deepEqual(values, copy);
	});

	it('picks the value with the highest index in the map, from the list of values', function () {
		var result = axe.utils.aggregate(map, ['knight', 'master', 'youngling']);
		assert.equal(result, 'master');
	});

	it('considers the initial value in addition to the other values', function () {
		var result = axe.utils.aggregate(map, ['knight', 'master', 'youngling'], 'grand master');
		assert.equal(result, 'grand master');
	});

	it('ignores values not on the map', function () {
		var result = axe.utils.aggregate(map, ['bounty hunter', 'sith lord'], 'youngling');
		assert.equal(result, 'youngling');
	});

	it('returns undefined if no value was found', function () {
		assert.isUndefined(axe.utils.aggregate(map, ['smugler', 'droid']));
	});

});