describe('commons', function () {
	'use strict';

	it('should be an object', function () {
		assert.isObject(commons);
	});

	it('should have a version property', function () {
		assert.isString(commons.version);
	});
});