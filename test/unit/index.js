describe('kslib', function () {
	'use strict';

	it('should be an object', function () {
		assert.isObject(kslib);
	});

	it('should have a version property', function () {
		assert.isString(kslib.version);
	});
});