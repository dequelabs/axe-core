describe('link-in-text-block', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var styleElm;

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
		styleElm.innerText = '';
	});

	after(function () {
		styleElm.parentNode.removeChild(styleElm);
	});

	function createStyleString(selector, styleObj) {
		// Merge style with the default
		styleObj = Object.assign({}, defaultStyle, styleObj);

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
		styleElm.innerText += selector + ' {\n' + cssLines + '\n}\n';
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
		assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
	});

	describe('link default state', function () {
		beforeEach(function () {
			createStyleString('a', {
				color: '#100' // insufficeint contrast
			});
		});

		it('uses color.elementIsDistinct to test the initial state', function () {
			var isCalled;
			var orig = commons.color.elementIsDistinct;
			var linkElm = getLinkElm();

			commons.color.elementIsDistinct = function (arg1, arg2) {
				isCalled = true;
				return orig(arg1, arg2);
			};

			checks['link-in-text-block'].evaluate(linkElm);
			assert.ok(isCalled);
			commons.color.elementIsDistinct = orig;
		});

		it('passes the selected node and closest ancestral block element', function () {
			fixture.innerHTML =
			'<div> <span style="display:block" id="parent">' +
			'  <p style="display:inline"><a href="" id="link">' +
			'     link text ' +
			'  </a> inside block </p> inside block' +
			'</span> outside block </div>';

			var orig = commons.color.elementIsDistinct;
			var linkElm = document.getElementById('link');
			var parentElm = document.getElementById('parent');

			commons.color.elementIsDistinct = function (arg1, arg2) {
				assert.deepEqual(arg1, linkElm);
				assert.deepEqual(arg2, parentElm);
				return orig(arg1, arg2);
			};

			checks['link-in-text-block'].evaluate(linkElm);
			commons.color.elementIsDistinct = orig;
		});

	});


	describe('links distinguished through color', function () {
		beforeEach(function () {
			createStyleString('a:active, a:focus', {
				textDecoration: 'underline'
			});
		});

		it('returns true if text contrast >= 3:0', function() {
			var linkElm = getLinkElm({
				color: 'cyan'
			}, {
				color: 'black'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false if text contrast < 3:0', function() {
			var linkElm = getLinkElm({
				color: '#000010'
			}, {
				color: '#000000'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns true if background contrast >= 3:0', function() {
			var linkElm = getLinkElm({
				backgroundColor: 'purple'
			}, {
				backgroundColor: 'white'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false if background contrast < 3:0', function() {
			var linkElm = getLinkElm({
				backgroundColor: '#FFE'
			}, {
				backgroundColor: '#FFF'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

	});

	it('looks at the :visited state');

	it('looks at selectors using :link');

});