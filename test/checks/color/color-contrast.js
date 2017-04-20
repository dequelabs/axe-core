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

	it('should return the proper values stored in data', function () {
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
		assert.isAtLeast(parseFloat(checkContext._data.fontSize), 14, 0.5);
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
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 8pt; -webkit-text-size-adjust: none;" id="target">' +
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

	it('should ignore position:fixed elements above the target', function () {
		fixture.innerHTML = '<div style="background-color: #e5f1e5;" id="background">' +
			'<div style="width:100%; position:fixed; top:0; height:50px; background: #F0F0F0; z-index: 200; color:#fff" >header</div>' +
			'<div style="height: 6000px;"></div>' +
			'stuff <span id="target" style="color: rgba(91, 91, 90, 0.7)">This is some text</span>' +
			'<div style="height: 6000px;"></div>' +
			'</div>';
		var target = fixture.querySelector('#target');
		var expectedRelatedNodes = fixture.querySelector('#background');
		assert.isFalse(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [expectedRelatedNodes]);
	});

	it('should find contrast issues on position:fixed elements', function () {
		fixture.innerHTML = '<div style="background-color: #e5f1e5;" id="background">' +
			'<div style="width:100%; position:fixed; top:0; height:50px; background: #F0F0F0; z-index: 200; color:#fff" id="target">header</div>' +
			'<div style="height: 6000px;"></div>' +
			'stuff <span style="color: rgba(91, 91, 90, 0.7)">This is some text</span>' +
			'<div style="height: 6000px;"></div>' +
			'</div>';

		var target = fixture.querySelector('#target');
		assert.isFalse(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [target]);
	});

	it('should return undefined for background-image elements', function () {
		var dataURI = 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/' +
		'XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkA' +
		'ABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKU' +
		'E1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7';

		fixture.innerHTML = '<div id="background" style="background:url('+ dataURI +') no-repeat left center; padding: 5px 0 5px 25px;">' +
			'<p id="target">Text 1</p>' +
			'</div>';

		var target = fixture.querySelector('#target');
		assert.isUndefined(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.isUndefined(checkContext._data.bgColor);
		assert.equal(checkContext._data.contrastRatio, 0);
		assert.equal(checkContext._data.missingData[0].reason, 'bgImage');
	});

	it('should return undefined for background-gradient elements', function () {
		fixture.innerHTML = '<div id="background" style="background-image:linear-gradient(red, orange);">' +
			'<p id="target">Text 2</p>' +
			'</div>';

		var target = fixture.querySelector('#target');
		assert.isUndefined(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.isUndefined(checkContext._data.bgColor);
		assert.equal(checkContext._data.missingData[0].reason, 'bgGradient');
		assert.equal(checkContext._data.contrastRatio, 0);
	});
});
