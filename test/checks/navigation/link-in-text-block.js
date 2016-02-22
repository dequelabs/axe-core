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
		styleElm.innerText += createStyleString('p', defaultStyle);
	});

	afterEach(function () {
		fixture.innerHTML = '';
		styleElm.innerText = '';
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

		return selector + ' {\n' + cssLines + '\n}\n';
	}

	function getLinkElm(linkStyle, paragraphStyle) {
		// Get a random id and build the style string
		var linkId = 'linkid-' + Math.floor(Math.random() * 100000);
		var parId = 'parid-' + Math.floor(Math.random() * 100000);

		styleElm.innerText += createStyleString('#' + linkId, linkStyle);
		styleElm.innerText += createStyleString('#' + parId, paragraphStyle);

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

	describe('default style', function () {
		beforeEach(function () {
			styleElm.innerText += createStyleString('a', {
				color: '#100' // insufficeint contrast
			});
		});

		it('returns false without style adjustments', function () {
			var linkElm = getLinkElm({});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns true with background-image set', function () {
			var linkElm = getLinkElm({
				background: 'url(icon.png) no-repeat'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns true with border: dashed 1px black', function () {
			var linkElm = getLinkElm({
				border: 'dashed 1px black'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false with border: solid 0px black', function () {
			var linkElm = getLinkElm({
				border: 'solid 0px black'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false with border: none 1px black', function () {
			var linkElm = getLinkElm({
				border: 'none 1px black'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false with border: solid 1px transparant', function () {
			var linkElm = getLinkElm({
				border: 'solid 1px transparant'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns true if font-weight is different', function () {
			var linkElm = getLinkElm({
				fontWeight: 'bold'
			}, {
				fontWeight: 'normal'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false if font-weight is the same', function () {
			var linkElm = getLinkElm({
				fontWeight: 'bold'
			}, {
				fontWeight: 'bold'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('compares font numbers and labels correctly', function () {
			var linkElm = getLinkElm({
				fontWeight: 'bold'
			}, {
				fontWeight: '700'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns true if text-decoration is different', function () {
			var linkElm = getLinkElm({
				textDecoration: 'underline'
			}, {
				textDecoration: 'none'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false if text-decoration is the same', function () {
			var linkElm = getLinkElm({
				textDecoration: 'underline'
			}, {
				textDecoration: 'underline'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

	});

});