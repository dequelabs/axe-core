describe('dom.getViewportSize', function () {
	'use strict';

	/* @todo pleaes let me know if there is a reliable way to test the actual values cross-browser */
	it('should return an object with width and height', function () {

		var result = kslib.dom.getViewportSize(window);

		assert.property(result, 'width');
		assert.property(result, 'height');

		assert.isNumber(result.width);
		assert.isNumber(result.height);
	});

});
