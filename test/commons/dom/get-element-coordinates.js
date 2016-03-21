//@todo better coverage
describe('dom.getElementCoordinates', function () {
	'use strict';
	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should calculate bounding box based on element position', function () {
		var el, coords;

		fixture.innerHTML = '<div id="div" style="position: absolute; top: -1px; left: -1px;">' +
			'<span id="coords0" style="position:absolute; top: -999px; left: -999px; width: 1000px; height: 1000px;">' +
				'Absolute</span>' +
			'</div>';

		el = document.getElementById('coords0');
		coords = axe.commons.dom.getElementCoordinates(el);
		assert.closeTo(coords.left, -1000, 0.5);
		assert.closeTo(coords.top, -1000, 0.5);
		assert.closeTo(coords.width, 1000, 0.5);
		assert.closeTo(coords.height, 1000, 0.5);
		assert.closeTo(coords.right, 0, 0.5);
		assert.closeTo(coords.bottom, 0, 0.5);

		el = document.getElementById('div');
		coords = axe.commons.dom.getElementCoordinates(el);
		assert.equal(Math.round(coords.left), -1);
		assert.equal(Math.round(coords.top), -1);
	});

	it('should take into account scroll offsets', function () {
		var el, coords,
			offset = axe.commons.dom.getScrollOffset(window.document);

		fixture.innerHTML = '<div id="div" style="position: absolute; top: -1px; left: -1px;">' +
			'<span id="coords0" style="position:absolute; top: -999px; left: -999px; width: 1000px; height: 1000px;">' +
				'Absolute</span>' +
			'</div>';

		el = document.getElementById('coords0');
		coords = axe.commons.dom.getElementCoordinates(el);
		assert.closeTo(coords.left, -1000, 0.5);
		assert.closeTo(coords.top, -1000, 0.5);
		assert.closeTo(coords.width, 1000, 0.5);
		assert.closeTo(coords.height, 1000, 0.5);
		assert.closeTo(coords.right, 0, 0.5);
		assert.closeTo(coords.bottom, 0, 0.5);

		window.scrollTo(0, 150);
		coords = axe.commons.dom.getElementCoordinates(el);
		assert.closeTo(coords.left, -1000, 0.5);
		assert.closeTo(coords.top, -1000, 0.5);
		assert.closeTo(coords.width, 1000, 0.5);
		assert.closeTo(coords.height, 1000, 0.5);
		assert.closeTo(coords.right, 0, 0.5);
		assert.closeTo(coords.bottom, 0, 0.5);

		window.scrollTo(offset.left, offset.top);

	});
});
