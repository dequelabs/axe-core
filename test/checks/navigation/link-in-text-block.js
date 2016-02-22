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

		it('returns true with border-bottom: dashed 1px black', function () {
			var linkElm = getLinkElm({
				borderBottom: 'dashed 1px black'
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

		it('returns true with outline: solid 1px black', function () {
			var linkElm = getLinkElm({
				outline: 'solid 1px black'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
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

		it('returns true if font-size is different', function () {
			var linkElm = getLinkElm({
				fontSize: '14px'
			}, {
				fontSize: '12px'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns true if font-family is different', function () {
			var linkElm = getLinkElm({
				fontFamily: 'Arial'
			}, {
				fontFamily: 'Arial-black'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false if the first font-family is identical', function () {
			var linkElm = getLinkElm({
				fontFamily: 'Arial-black, Arial'
			}, {
				fontFamily: 'Arial-black, sans-serif'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});
	});


	describe('links with hover and focus', function () {

		beforeEach(function () {
			createStyleString('a', {
				color: '#F00' // sufficeint contrast
			});
		});

		it('returns false if neither hover and focus are defined', function () {
			var linkElm = getLinkElm();
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false if only hover is defined', function () {
			var linkElm = getLinkElm();
			createStyleString('#' + linkElm.id + ':active', {
				textDecoration: 'underline'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false if only focus is defined', function () {
			var linkElm = getLinkElm();
			createStyleString('#' + linkElm.id + ':focus', {
				textDecoration: 'underline'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns true if both hover and focus are defined', function () {
			var linkElm = getLinkElm();
			createStyleString('#' + linkElm.id + ':active', {
				textDecoration: 'underline'
			});
			createStyleString('#' + linkElm.id + ':focus', {
				textDecoration: 'underline'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns true if hover and focus are defined in the same rule', function () {
			var linkElm = getLinkElm();
			createStyleString(
				'#' + linkElm.id + ':active, ' +
				'#' + linkElm.id + ':focus', {
				textDecoration: 'underline'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});
	});


	describe('links distinguished through color', function () {
		beforeEach(function () {
			createStyleString('a:active, a:focus', {
				textDecoration: 'underline'
			});
		});

		it('returns true if text contrast <= 3:0', function() {
			var linkElm = getLinkElm({
				color: 'cyan'
			}, {
				color: 'black'
			});
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false if text contrast > 3:0', function() {
			var linkElm = getLinkElm({
				color: '#000010'
			}, {
				color: '#000000'
			});
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns true if background contrast <= 3:0', function() {
			var linkElm = getLinkElm({
				backgroundColor: 'cyan'
			});
			document.body.background = 'black';
			assert.isTrue(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('returns false if background contrast > 3:0', function() {
			var linkElm = getLinkElm({
				backgroundColor: '#000010'
			});
			document.body.background = '#000000';
			assert.isFalse(checks['link-in-text-block'].evaluate(linkElm));
		});

		it('has tests', function () {
			assert.ok(false, 'nope');
		});
	});

	it('looks at the :visited state', function () {
		assert.ok(false, 'nope, not yet');
	});

	it('looks at selectors using :link', function () {
		assert.ok(false, 'nope, not yet');
	});

	it('looks at initial & inherited values', function () {
		assert.ok(false, 'nope, not yet');
	});

});