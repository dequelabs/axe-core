describe('utils', function () {
	'use strict';

	it('should be an object', function () {
		assert.isObject(window.utils);
	});
	it('should be attached to axe global', function () {
		assert.equal(axe.utils, window.utils);
	});
});
