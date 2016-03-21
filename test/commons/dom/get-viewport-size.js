describe('dom.getViewportSize', function () {
	'use strict';

	it('should return an object with width and height', function () {

		var result = axe.commons.dom.getViewportSize(window);

		assert.property(result, 'width');
		assert.property(result, 'height');

		assert.isNumber(result.width);
		assert.isNumber(result.height);
	});

	it('should have some fallbacks for old browsers', function () {

		var result = axe.commons.dom.getViewportSize({
			document: {},
			innerWidth: 12,
			innerHeight: 47
		});

		assert.equal(result.width, 12);
		assert.equal(result.height, 47);

		result = axe.commons.dom.getViewportSize({
			document: {
				documentElement: {
					clientWidth: 13,
					clientHeight: 48
				}
			}
		});

		assert.equal(result.width, 13);
		assert.equal(result.height, 48);

		result = axe.commons.dom.getViewportSize({
			document: {
				body: {
					clientWidth: 22,
					clientHeight: 41
				}
			}
		});

		assert.equal(result.width, 22);
		assert.equal(result.height, 41);

	});

});