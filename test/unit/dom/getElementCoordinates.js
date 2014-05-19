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
		coords = kslib.dom.getElementCoordinates(el);
		assert.equal(coords.left, -1000);
		assert.equal(coords.top, -1000);
		assert.equal(coords.width, 1000);
		assert.equal(coords.height, 1000);
		assert.equal(coords.right, 0);
		assert.equal(coords.bottom, 0);

		el = document.getElementById('div');
		coords = kslib.dom.getElementCoordinates(el);
		assert.equal(Math.floor(coords.left), -1);
		assert.equal(Math.floor(coords.top), -1);
	});

	it('should take into account scroll offsets', function () {
		var el, coords,
			offset = kslib.dom.getScrollOffset(window.document);

		fixture.innerHTML = '<div id="div" style="position: absolute; top: -1px; left: -1px;">' +
			'<span id="coords0" style="position:absolute; top: -999px; left: -999px; width: 1000px; height: 1000px;">' +
				'Absolute</span>' +
			'</div>';

		el = document.getElementById('coords0');
		coords = kslib.dom.getElementCoordinates(el);
		assert.equal(coords.left, -1000);
		assert.equal(coords.top, -1000);
		assert.equal(coords.width, 1000);
		assert.equal(coords.height, 1000);
		assert.equal(coords.right, 0);
		assert.equal(coords.bottom, 0);

		window.scrollTo(0, 150);
		coords = kslib.dom.getElementCoordinates(el);
		assert.equal(coords.left, -1000);
		assert.equal(coords.top, -1000);
		assert.equal(coords.width, 1000);
		assert.equal(coords.height, 1000);
		assert.equal(coords.right, 0);
		assert.equal(coords.bottom, 0);

		window.scrollTo(offset.left, offset.top);

	});
});