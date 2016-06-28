describe('UMD window', function () {
	'use strict';

	it('exposes axe as a property of window', function () {
		assert.strictEqual(window.axe, axe);
	});

});
