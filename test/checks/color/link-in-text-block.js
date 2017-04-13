describe('link-in-text-block', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var styleElm;

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

	before(function () {
		styleElm = document.createElement('style');
		document.head.appendChild(styleElm);
	});

	var defaultStyle = {
		color: '#000',
		'textDecoration': 'none',
	};

	beforeEach(function () {
		createStyleString('p', defaultStyle);
	});

	afterEach(function () {
		fixture.innerHTML = '';
		styleElm.innerHTML = '';
		checkContext._relatedNodes = [];
		checkContext._data = null;
	});

	after(function () {
		styleElm.parentNode.removeChild(styleElm);
	});

	function createStyleString(selector, outerStyle) {
		// Merge style with the default
		var prop;
		var styleObj = {};
		for (prop in defaultStyle) {
			if (defaultStyle.hasOwnProperty(prop)) {
				styleObj[prop] = defaultStyle[prop];
			}
    	}
		for (prop in outerStyle) {
			if (outerStyle.hasOwnProperty(prop)) {
				styleObj[prop] = outerStyle[prop];
			}
    	}

		var cssLines = Object.keys(styleObj).map(function (prop) {
			// Make camelCase prop dash separated
			var cssPropName = prop.trim()
			.split(/(?=[A-Z])/g)
			.reduce(function (prop, propPiece) {
				if (!prop) {
					return propPiece;
				} else {
					return prop + '-' + propPiece.toLowerCase();
				}
			}, null);

			// Return indented line of style code
			return '  ' + cssPropName + ':' + styleObj[prop] + ';';
		}).join('\n');

		// Add to the style element
		styleElm.innerHTML += selector + ' {\n' + cssLines + '\n}\n';
	}

	function getLinkElm(linkStyle, paragraphStyle) {
		// Get a random id and build the style string
		var linkId = 'linkid-' + Math.floor(Math.random() * 100000);
		var parId = 'parid-' + Math.floor(Math.random() * 100000);

		createStyleString('#' + linkId, linkStyle);
		createStyleString('#' + parId, paragraphStyle);

		fixture.innerHTML += '<p id="' + parId + '"> Text ' +
			'<a href="/" id="' + linkId + '">link</a>' +
		'</p>';
		return document.getElementById(linkId);

	}

	it('returns true if links have the exact same color', function () {
		var linkElm = getLinkElm({
			color: 'black'
		}, {
			color: '#000'
		});
		assert.isTrue(checks['link-in-text-block'].evaluate.call(checkContext, linkElm));
	});

	describe('link default state', function () {
		beforeEach(function () {
			createStyleString('a', {
				color: '#100' // insufficeint contrast
			});
		});

		it('uses color.elementIsDistinct to test the initial state', function () {
			var isCalled;
			var orig = axe.commons.color.elementIsDistinct;
			var linkElm = getLinkElm();

			axe.commons.color.elementIsDistinct = function (arg1, arg2) {
				isCalled = true;
				return orig(arg1, arg2);
			};

			checks['link-in-text-block'].evaluate.call(checkContext, linkElm);
			assert.ok(isCalled);
			axe.commons.color.elementIsDistinct = orig;
		});

		it('passes the selected node and closest ancestral block element', function () {
			fixture.innerHTML =
			'<div> <span style="display:block" id="parent">' +
			'  <p style="display:inline"><a href="" id="link">' +
			'     link text ' +
			'  </a> inside block </p> inside block' +
			'</span> outside block </div>';

			var orig = axe.commons.color.elementIsDistinct;
			var linkElm = document.getElementById('link');
			var parentElm = document.getElementById('parent');

			axe.commons.color.elementIsDistinct = function (arg1, arg2) {
				assert.deepEqual(arg1, linkElm);
				assert.deepEqual(arg2, parentElm);
				return orig(arg1, arg2);
			};

			checks['link-in-text-block'].evaluate.call(checkContext, linkElm);
			axe.commons.color.elementIsDistinct = orig;
		});

	});


	describe('links distinguished through color', function () {
		beforeEach(function () {
			createStyleString('a:active, a:focus', {
				textDecoration: 'underline'
			});
		});

		it('returns undefined if text contrast >= 3:0', function() {
			var linkElm = getLinkElm({
				color: 'cyan'
			}, {
				color: 'black'
			});
			assert.isUndefined(checks['link-in-text-block'].evaluate.call(checkContext, linkElm));
		});

		it('returns false if text contrast < 3:0', function() {
			var linkElm = getLinkElm({
				color: '#000010'
			}, {
				color: '#000000'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate.call(checkContext, linkElm));
		});

		it('returns undefined if background contrast >= 3:0', function() {
			var linkElm = getLinkElm({
				color: '#000010',
				backgroundColor: 'purple'
			}, {
				color: '#000000',
				backgroundColor: 'white'
			});
			assert.isUndefined(checks['link-in-text-block'].evaluate.call(checkContext, linkElm));
			assert.equal(checkContext._data.missingData[0].reason, 'bgContrast');
		});

		it('returns false if background contrast < 3:0', function() {
			var linkElm = getLinkElm({
				color: '#000010',
				backgroundColor: '#FFE'
			}, {
				color: '#000000',
				backgroundColor: '#FFF'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate.call(checkContext, linkElm));
		});

		it('returns undefined if the background contrast can not be determined', function () {
			var linkElm = getLinkElm({ }, {
				color: '#000010',
				backgroundImage: 'url(data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7)'
			}, {
				color: '#000000'
			});
			assert.isUndefined(checks['link-in-text-block'].evaluate.call(checkContext, linkElm));
			assert.equal(checkContext._data.missingData[0].reason, 'bgImage');
		});

	});

	it('looks at the :visited state');

	it('looks at selectors using :link');

});