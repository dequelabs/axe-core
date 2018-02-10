describe('color-contrast', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
		axe._tree = undefined;
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

	it('should return true for inline elements with sufficient contrast spanning multiple lines', function () {
		fixture.innerHTML = '<p>Text oh heyyyy <a href="#" id="target">and here\'s <br>a link</a></p>';
		var target = fixture.querySelector('#target');
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
		} else {
			assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
			assert.deepEqual(checkContext._relatedNodes, []);
		}
	});

	it('should return undefined for inline elements spanning multiple lines that are overlapped', function () {
		fixture.innerHTML = '<div style="position:relative;"><div style="background-color:rgba(0,0,0,1);position:absolute;width:300px;height:200px;"></div>' +
		'<p>Text oh heyyyy <a href="#" id="target">and here\'s <br>a link</a></p></div>';
		var target = fixture.querySelector('#target');
		assert.isUndefined(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true for inline elements with sufficient contrast', function () {
		fixture.innerHTML = '<p>Text oh heyyyy <b id="target">and here\'s bold text</b></p>';
		var target = fixture.querySelector('#target');
		var result = checks['color-contrast'].evaluate.call(checkContext, target);
		assert.isTrue(result);
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
		assert.equal(checkContext._data.missingData, 'bgImage');
	});

	it('should return undefined for background-gradient elements', function () {
		fixture.innerHTML = '<div id="background" style="background-image:linear-gradient(red, orange);">' +
			'<p id="target">Text 2</p>' +
			'</div>';

		var target = fixture.querySelector('#target');
		assert.isUndefined(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.isUndefined(checkContext._data.bgColor);
		assert.equal(checkContext._data.missingData, 'bgGradient');
		assert.equal(checkContext._data.contrastRatio, 0);
	});

	it('should return undefined when there are elements overlapping', function (done) {
		// Give Edge time to scroll... :/
		setTimeout(function () {
			fixture.innerHTML = '<div style="color: black; background-color: white; width: 200px; height: 100px; position: relative;" id="target">' +
				'My text <div style="position: absolute; top:0; left: 0; background-color: white; width: 100%; height: 100%;"></div></div>';
			var target = fixture.querySelector('#target');
			var result = checks['color-contrast'].evaluate.call(checkContext, target);
			assert.isUndefined(result);
			assert.equal(checkContext._data.missingData, 'bgOverlap');
			assert.equal(checkContext._data.contrastRatio, 0);
			done();
		}, 10);
	});

	it('should return true when a form wraps mixed content', function() {
		fixture.innerHTML = '<form id="pass6"><p>Some text</p><label for="input6">Text</label><input id="input6"></form>';
		var target = fixture.querySelector('#pass6');
		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
	});

	it('should return true when a label wraps a text input', function () {
		fixtureSetup('<label id="target">' +
			'My text <input type="text"></label>');
		var target = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], target);
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
		} else {
			var result = checks['color-contrast'].evaluate.call(checkContext, target, {}, virtualNode);
			assert.isTrue(result);
		}
	});

	it('should return true when a label wraps a text input but doesn\'t overlap', function () {
		fixture.innerHTML = '<label id="target">' +
			'My text <input type="text" style="position: absolute; top: 200px;"></label>';
		var target = fixture.querySelector('#target');
		var result = checks['color-contrast'].evaluate.call(checkContext, target);
		assert.isTrue(result);
	});

	it('should return true when there is sufficient contrast based on thead', function () {
		fixture.innerHTML = '<table><thead style="background: #d00d2c"><tr><th id="target" style="color: #fff; padding: .5em">Col 1</th></tr></thead></table>';
		var target = fixture.querySelector('#target');
		axe._tree = axe.utils.getFlattenedTree(fixture.firstChild);
		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast based on tbody', function () {
		fixture.innerHTML = '<table><tbody style="background: #d00d2c"><tr><td id="target" style="color: #fff; padding: .5em">Col 1</td></tr></tbody></table>';
		var target = fixture.querySelector('#target');
		axe._tree = axe.utils.getFlattenedTree(fixture.firstChild);
		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return undefined if element overlaps text content', function (done) {
		// Give Edge time to scroll
		setTimeout(function () {
			fixture.innerHTML = '<div style="background-color: white; height: 60px; width: 80px; border:1px solid;position: relative;">' +
				'<div id="target" style="color: white; height: 40px; width: 60px; border:1px solid red;">Hi</div>' +
				'<div style="position: absolute; top: 0; width: 60px; height: 40px;background-color: #000"></div>' +
			'</div>';
			var target = fixture.querySelector('#target');
			var actual = checks['color-contrast'].evaluate.call(checkContext, target);
			assert.isUndefined(actual);
			assert.equal(checkContext._data.missingData, 'bgOverlap');
			assert.equal(checkContext._data.contrastRatio, 0);
			done();
		}, 10);
	});

	it('should return undefined if element has same color as background', function () {
		fixture.innerHTML = '<div style="background-color: white;">' +
			'<div style="color:white;" id="target">Text</div>'+
		'</div>';
		var target = fixture.querySelector('#target');
		var actual = checks['color-contrast'].evaluate.call(checkContext, target);
		assert.isUndefined(actual);
		assert.equal(checkContext._data.missingData, 'equalRatio');
		assert.equal(checkContext._data.contrastRatio, 1);
	});

	it('returns relatedNodes with undefined', function () {
		var dataURI = 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/' +
		'XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkA' +
		'ABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKU' +
		'E1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7';

		fixture.innerHTML = '<div id="background" style="background:url('+ dataURI +') no-repeat left center; padding: 5px 0 5px 25px;">' +
			'<p id="target">Text 1</p>' +
			'</div>';

		var target = fixture.querySelector('#target');
		assert.isUndefined(checks['color-contrast'].evaluate.call(checkContext, target));

		assert.equal(
			checkContext._relatedNodes[0],
			document.querySelector('#background')
		);
	});

	(shadowSupported ? it : xit)
	('returns colors across Shadow DOM boundaries', function () {
		var params = shadowCheckSetup(
			'<div id="container" style="background-color:black;"></div>',
			'<p style="color: #333;" id="target">Text</p>'
		);
		var container = fixture.querySelector('#container');
		var result = checks['color-contrast'].evaluate.apply(checkContext, params);
		assert.isFalse(result);
		assert.deepEqual(checkContext._relatedNodes, [container]);
	});
});
