describe('color-contrast', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = {
		_relatedNodes: [],
		_data: null,
		data: function (d) {
			this._data = d;
		},
		relatedNodes: function (rn) {
			this._relatedNodes = rn;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._relatedNodes = [];
		checkContext._data = null;
	});

	it('should return store the proper values in data', function () {
		fixture.innerHTML = '<div id="parent" style="color: black; background-color: white; font-size: 14pt"><b id="target">' +
			'My text</b></div>';
		var target = fixture.querySelector('#target');

		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		var white = new axe.commons.color.Color(255, 255, 255, 1);
		var black = new axe.commons.color.Color(0, 0, 0, 1);
		assert.equal(checkContext._data.bgColor, white.toHexString());
		assert.equal(checkContext._data.fgColor, black.toHexString());
		assert.equal(checkContext._data.contrastRatio, '21.00');
		assert.equal(checkContext._data.fontWeight, 'bold');
		assert.closeTo(parseFloat(checkContext._data.fontSize), 14, 0.5);
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast because of bold tag', function () {
		fixture.innerHTML = '<div id="parent" style="color: gray; background-color: white; font-size: 14pt"><b id="target">' +
			'My text</b></div>';
		var target = fixture.querySelector('#target');

		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast because of font weight', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 14pt; font-weight: bold" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast because of font size', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 18pt;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return false when there is not sufficient contrast because of font size', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 8pt;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [target]);
	});

	it('should return true when there is sufficient contrast with explicit transparency', function () {
		fixture.innerHTML = '<div id="parent" style="color: white; background-color: white;">' +
			'<span style="color: black; background-color: rgba(0,0,0,0)" id="target">My text</span></div>';
		var target = fixture.querySelector('#target');

		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast with implicit transparency', function () {
		fixture.innerHTML = '<div id="parent" style="color: white; background-color: white;">' +
			'<span style="color: black;" id="target">My text</span></div>';
		var target = fixture.querySelector('#target');

		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast', function () {
		fixture.innerHTML = '<div style="color: black; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return false when there is not sufficient contrast', function () {
		fixture.innerHTML = '<div style="color: yellow; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [target]);
	});

});
