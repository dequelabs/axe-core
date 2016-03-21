describe('utils.toArray', function () {
	'use strict';

	it('should call Array.prototype.slice', function () {
		var orig = Array.prototype.slice,
			called = false,
			arrayLike = {'0': 'cats', length: 1};

		Array.prototype.slice = function () {
			called = true;
			assert.equal(this, arrayLike);
		};

		axe.commons.utils.toArray(arrayLike);

		Array.prototype.slice = orig;

		assert.isTrue(called);
	});
	it('should return an array', function () {
		var arrayLike = {'0': 'cats', length: 1};

		var result = axe.commons.utils.toArray(arrayLike);
		assert.isArray(result);
	});
});