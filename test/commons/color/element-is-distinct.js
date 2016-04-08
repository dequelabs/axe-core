describe('color.elementIsDistinct', function () {
	'use strict';
	var styleElm, elementIsDistinct;

	var fixture = document.getElementById('fixture');

	before(function () {
		styleElm = document.createElement('style');
		document.head.appendChild(styleElm);
	});

	var defaultStyle = {
		color: '#000',
		'textDecoration': 'none',
	};

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
		return {
			link: document.getElementById(linkId),
			par: document.getElementById(parId)
		};
	}

	beforeEach(function () {
		createStyleString('p', defaultStyle);
		elementIsDistinct = axe.commons.color.elementIsDistinct;
	});

	afterEach(function () {
		fixture.innerHTML = '';
		styleElm.innerHTML = '';
	});

	after(function () {
		styleElm.parentNode.removeChild(styleElm);
	});

	it('returns false without style adjustments', function () {
		var elms = getLinkElm({});
		var result = elementIsDistinct(elms.link, elms.par);

		assert.isFalse(result);
	});

	it('returns true with background-image set', function () {
		var elms = getLinkElm({
			background: 'url(icon.png) no-repeat'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isTrue(result);
	});

	it('returns true with border: dashed 1px black', function () {
		var elms = getLinkElm({
			border: 'dashed 1px black'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isTrue(result);
	});

	it('returns true with border-bottom: dashed 1px black', function () {
		var elms = getLinkElm({
			borderBottom: 'dashed 1px black'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isTrue(result);
	});

	it('returns false with border: solid 0px black', function () {
		var elms = getLinkElm({
			border: 'solid 0px black'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isFalse(result);
	});

	it('returns false with border: none 1px black', function () {
		var elms = getLinkElm({
			border: 'none 1px black'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isFalse(result);
	});

	it('returns false with border: solid 1px transparent', function () {
		var elms = getLinkElm({
			border: 'solid 1px transparent'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isFalse(result);
	});

	it('returns true with outline: solid 1px black', function () {
		var elms = getLinkElm({
			outline: 'solid 1px black'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isTrue(result);
	});

	it('returns true if font-weight is different', function () {
		var elms = getLinkElm({
			fontWeight: 'bold'
		}, {
			fontWeight: 'normal'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isTrue(result);
	});

	it('returns false if font-weight is the same', function () {
		var elms = getLinkElm({
			fontWeight: 'bold'
		}, {
			fontWeight: 'bold'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isFalse(result);
	});

	it('compares font numbers and labels correctly', function () {
		var elms = getLinkElm({
			fontWeight: 'bold'
		}, {
			fontWeight: '700'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isFalse(result);
	});

	it('returns true if text-decoration is different', function () {
		var elms = getLinkElm({
			textDecoration: 'underline'
		}, {
			textDecoration: 'none'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isTrue(result);
	});

	it('returns false if text-decoration is the same', function () {
		var elms = getLinkElm({
			textDecoration: 'underline'
		}, {
			textDecoration: 'underline'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isFalse(result);
	});

	it('returns true if font-size is different', function () {
		var elms = getLinkElm({
			fontSize: '14px'
		}, {
			fontSize: '12px'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isTrue(result);
	});

	it('returns true if font-family is different', function () {
		var elms = getLinkElm({
			fontFamily: 'Arial'
		}, {
			fontFamily: 'Arial-black'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isTrue(result);
	});

	it('returns false if the first font-family is identical', function () {
		var elms = getLinkElm({
			fontFamily: 'Arial-black, Arial'
		}, {
			fontFamily: 'Arial-black, sans-serif'
		});

		var result = elementIsDistinct(elms.link, elms.par);
		assert.isFalse(result);
	});

});