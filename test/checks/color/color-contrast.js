describe('color-contrast', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var checkContext = axe.testUtils.MockCheckContext();
	var contrastEvaluate = checks['color-contrast'].evaluate;

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
		axe._tree = undefined;
	});

	it('should return the proper values stored in data', function() {
		var params = checkSetup(
			'<div id="parent" style="color: black; background-color: white; font-size: 14pt">' +
				'<b id="target">My text</b></div>'
		);
		var white = new axe.commons.color.Color(255, 255, 255, 1);
		var black = new axe.commons.color.Color(0, 0, 0, 1);

		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.equal(checkContext._data.bgColor, white.toHexString());
		assert.equal(checkContext._data.fgColor, black.toHexString());
		assert.equal(checkContext._data.contrastRatio, '21.00');
		assert.equal(checkContext._data.fontWeight, 'bold');
		assert.isAtLeast(parseFloat(checkContext._data.fontSize), 14, 0.5);
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast because of bold tag', function() {
		var params = checkSetup(
			'<div id="parent" style="color: gray; background-color: white; font-size: 14pt">' +
				'<b id="target">My text</b></div>'
		);

		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast because of font weight', function() {
		var params = checkSetup(
			'<div style="color: gray; background-color: white; font-size: 14pt; font-weight: bold" id="target">' +
				'My text</div>'
		);

		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast because of font size', function() {
		var params = checkSetup(
			'<div style="color: gray; background-color: white; font-size: 18pt;" id="target">' +
				'My text</div>'
		);
		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return false when there is not sufficient contrast because of font size', function() {
		var params = checkSetup(
			'<div style="color: gray; background-color: white; font-size: 8pt; -webkit-text-size-adjust: none;" id="target">' +
				'My text</div>'
		);

		assert.isFalse(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, [params[0]]);
	});

	it('should return true when there is sufficient contrast with explicit transparency', function() {
		var params = checkSetup(
			'<div id="parent" style="color: white; background-color: white;">' +
				'<span style="color: black; background-color: rgba(0,0,0,0)" id="target">My text</span></div>'
		);

		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast with implicit transparency', function() {
		var params = checkSetup(
			'<div id="parent" style="color: white; background-color: white;">' +
				'<span style="color: black;" id="target">My text</span></div>'
		);

		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast', function() {
		var params = checkSetup(
			'<div style="color: black; background-color: white;" id="target">' +
				'My text</div>'
		);

		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true for inline elements with sufficient contrast spanning multiple lines', function() {
		var params = checkSetup(
			'<p>Text oh heyyyy <a href="#" id="target">and here\'s <br>a link</a></p>'
		);
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
		} else {
			assert.isTrue(contrastEvaluate.apply(checkContext, params));
			assert.deepEqual(checkContext._relatedNodes, []);
		}
	});

	it('should return undefined for inline elements spanning multiple lines that are overlapped', function() {
		var params = checkSetup(
			'<div style="position:relative;"><div style="background-color:rgba(0,0,0,1);position:absolute;width:300px;height:200px;"></div>' +
				'<p>Text oh heyyyy <a href="#" id="target">and here\'s <br>a link</a></p></div>'
		);
		assert.isUndefined(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true for inline elements with sufficient contrast', function() {
		var params = checkSetup(
			'<p>Text oh heyyyy <b id="target">and here\'s bold text</b></p>'
		);
		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return false when there is not sufficient contrast', function() {
		var params = checkSetup(
			'<div style="color: yellow; background-color: white;" id="target">' +
				'My text</div>'
		);

		assert.isFalse(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, [params[0]]);
	});

	it('should ignore position:fixed elements above the target', function() {
		var params = checkSetup(
			'<div style="background-color: #e5f1e5;" id="background">' +
				'<div style="width:100%; position:fixed; top:0; height:50px; background: #F0F0F0; z-index: 200; color:#fff" >header</div>' +
				'<div style="height: 6000px;"></div>' +
				'stuff <span id="target" style="color: rgba(91, 91, 90, 0.7)">This is some text</span>' +
				'<div style="height: 6000px;"></div>' +
				'</div>'
		);
		var expectedRelatedNodes = fixture.querySelector('#background');
		assert.isFalse(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, [expectedRelatedNodes]);
	});

	it('should find contrast issues on position:fixed elements', function() {
		var params = checkSetup(
			'<div style="background-color: #e5f1e5;" id="background">' +
				'<div style="width:100%; position:fixed; top:0; height:50px; background: #F0F0F0; z-index: 200; color:#fff" id="target">header</div>' +
				'<div style="height: 6000px;"></div>' +
				'stuff <span style="color: rgba(91, 91, 90, 0.7)">This is some text</span>' +
				'<div style="height: 6000px;"></div>' +
				'</div>'
		);
		assert.isFalse(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, [params[0]]);
	});

	it('should return undefined for background-image elements', function() {
		var dataURI =
			'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/' +
			'XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkA' +
			'ABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKU' +
			'E1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7';

		var params = checkSetup(
			'<div id="background" style="background:url(' +
				dataURI +
				') no-repeat left center; padding: 5px 0 5px 25px;">' +
				'<p id="target">Text 1</p>' +
				'</div>'
		);

		assert.isUndefined(contrastEvaluate.apply(checkContext, params));
		assert.isUndefined(checkContext._data.bgColor);
		assert.equal(checkContext._data.contrastRatio, 0);
		assert.equal(checkContext._data.missingData, 'bgImage');
	});

	it('should return undefined for background-gradient elements', function() {
		var params = checkSetup(
			'<div id="background" style="background-image:linear-gradient(red, orange);">' +
				'<p id="target">Text 2</p>' +
				'</div>'
		);

		assert.isUndefined(contrastEvaluate.apply(checkContext, params));
		assert.isUndefined(checkContext._data.bgColor);
		assert.equal(checkContext._data.missingData, 'bgGradient');
		assert.equal(checkContext._data.contrastRatio, 0);
	});

	it('should return undefined when there are elements overlapping', function(done) {
		// Give Edge time to scroll... :/
		setTimeout(function() {
			var params = checkSetup(
				'<div style="color: black; background-color: white; width: 200px; height: 100px; position: relative;" id="target">' +
					'My text <div style="position: absolute; top:0; left: 0; background-color: white; width: 100%; height: 100%;"></div></div>'
			);

			var result = contrastEvaluate.apply(checkContext, params);
			assert.isUndefined(result);
			assert.equal(checkContext._data.missingData, 'bgOverlap');
			assert.equal(checkContext._data.contrastRatio, 0);
			done();
		}, 10);
	});

	it('should return true when a form wraps mixed content', function() {
		var params = checkSetup(
			'<form id="target"><p>Some text</p><label for="input6">Text</label><input id="input6"></form>'
		);
		assert.isTrue(contrastEvaluate.apply(checkContext, params));
	});

	it('should return true when a label wraps a text input', function() {
		fixtureSetup('<label id="target">' + 'My text <input type="text"></label>');
		var target = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], target);
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
		} else {
			var result = contrastEvaluate.call(checkContext, target, {}, virtualNode);
			assert.isTrue(result);
		}
	});

	it("should return true when a label wraps a text input but doesn't overlap", function() {
		var params = checkSetup(
			'<label id="target">' +
				'My text <input type="text" style="position: absolute; top: 200px;"></label>'
		);
		var result = contrastEvaluate.apply(checkContext, params);
		assert.isTrue(result);
	});

	it('should return true when there is sufficient contrast based on thead', function() {
		var params = checkSetup(
			'<table><thead style="background: #d00d2c"><tr><th id="target" style="color: #fff; padding: .5em">Col 1</th></tr></thead></table>'
		);
		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast based on tbody', function() {
		var params = checkSetup(
			'<table><tbody style="background: #d00d2c"><tr><td id="target" style="color: #fff; padding: .5em">Col 1</td></tr></tbody></table>'
		);
		assert.isTrue(contrastEvaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return undefined if element overlaps text content', function(done) {
		// Give Edge time to scroll
		setTimeout(function() {
			var params = checkSetup(
				'<div style="background-color: white; height: 60px; width: 80px; border:1px solid;position: relative;">' +
					'<div id="target" style="color: white; height: 40px; width: 60px; border:1px solid red;">Hi</div>' +
					'<div style="position: absolute; top: 0; width: 60px; height: 40px;background-color: #000"></div>' +
					'</div>'
			);

			assert.isUndefined(contrastEvaluate.apply(checkContext, params));
			assert.equal(checkContext._data.missingData, 'bgOverlap');
			assert.equal(checkContext._data.contrastRatio, 0);
			done();
		}, 10);
	});

	it('should return undefined if element has same color as background', function() {
		var params = checkSetup(
			'<div style="background-color: white;">' +
				'<div style="color:white;" id="target">Text</div>' +
				'</div>'
		);

		assert.isUndefined(contrastEvaluate.apply(checkContext, params));
		assert.equal(checkContext._data.missingData, 'equalRatio');
		assert.equal(checkContext._data.contrastRatio, 1);
	});

	it('returns relatedNodes with undefined', function() {
		var dataURI =
			'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/' +
			'XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkA' +
			'ABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKU' +
			'E1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7';

		var params = checkSetup(
			'<div id="background" style="background:url(' +
				dataURI +
				') no-repeat left center; padding: 5px 0 5px 25px;">' +
				'<p id="target">Text 1</p>' +
				'</div>'
		);

		assert.isUndefined(contrastEvaluate.apply(checkContext, params));
		assert.equal(
			checkContext._relatedNodes[0],
			document.querySelector('#background')
		);
	});

	it('should return undefined for a single character text with insufficient contrast', function() {
		var params = checkSetup(
			'<div style="background-color: #FFF;">' +
				'<div style="color:#DDD;" id="target">X</div>' +
				'</div>'
		);

		var actual = contrastEvaluate.apply(checkContext, params);
		assert.isUndefined(actual);
		assert.equal(checkContext._data.missingData, 'shortTextContent');
	});

	it('should return true for a single character text with insufficient contrast', function() {
		var params = checkSetup(
			'<div style="background-color: #FFF;">' +
				'<div style="color:#000;" id="target">X</div>' +
				'</div>'
		);

		var actual = contrastEvaluate.apply(checkContext, params);
		assert.isTrue(actual);
	});

	(shadowSupported ? it : xit)(
		'returns colors across Shadow DOM boundaries',
		function() {
			var params = shadowCheckSetup(
				'<div id="container" style="background-color:black;"></div>',
				'<p style="color: #333;" id="target">Text</p>'
			);
			var container = fixture.querySelector('#container');
			var result = contrastEvaluate.apply(checkContext, params);
			assert.isFalse(result);
			assert.deepEqual(checkContext._relatedNodes, [container]);
		}
	);
});
