describe('color.Color', function () {
	'use strict';

	it('should set values properly via RGB', function () {
		var c = new axe.commons.color.Color();
		c.parseRgbString('rgb(17, 34, 51)');
		assert.equal(c.red, 17);
		assert.equal(c.green, 34);
		assert.equal(c.blue, 51);
		assert.equal(c.alpha, 1);
	});

	it('should set values properly via RGBA', function () {
		var c = new axe.commons.color.Color();
		c.parseRgbString('rgba(17, 34, 51, 0)');
		assert.equal(c.red, 17);
		assert.equal(c.green, 34);
		assert.equal(c.blue, 51);
		assert.equal(c.alpha, 0);
	});

	it('should return hex values properly', function () {
		var black = new axe.commons.color.Color(0, 0, 0, 1);
		var white = new axe.commons.color.Color(255, 255, 255, 1);
		var yellow = new axe.commons.color.Color(255, 255, 0, 1);
		var darkyellow = new axe.commons.color.Color(128, 128, 0, 1);
		var blue = new axe.commons.color.Color(0, 0, 255, 1);
		assert.equal(black.toHexString(), '#000000');
		assert.equal(white.toHexString(), '#ffffff');
		assert.equal(yellow.toHexString(), '#ffff00');
		assert.equal(darkyellow.toHexString(), '#808000');
		assert.equal(blue.toHexString(), '#0000ff');

	});

	it('should return hex values properly when they are non-integery', function () {
		var black = new axe.commons.color.Color(0, 0, 0, 1);
		var white = new axe.commons.color.Color(255, 255, 255, 0.1);
		var grayish = axe.commons.color.flattenColors(white, black);
		assert.equal(grayish.toHexString(), '#1a1a1a');

	});

	it('should calculate luminance sensibly', function () {
		var black = new axe.commons.color.Color(0, 0, 0, 1);
		var white = new axe.commons.color.Color(255, 255, 255, 1);
		var yellow = new axe.commons.color.Color(255, 255, 0, 1);
		var darkyellow = new axe.commons.color.Color(128, 128, 0, 1);
		var blue = new axe.commons.color.Color(0, 0, 255, 1);
		var lBlack = black.getRelativeLuminance();
		var lWhite = white.getRelativeLuminance();
		var lYellow = yellow.getRelativeLuminance();
		var lDarkyellow = darkyellow.getRelativeLuminance();
		var lBlue = blue.getRelativeLuminance();

		//values range from zero to one
		assert.equal(lBlack, 0);
		assert.equal(lWhite, 1);

		//brighter values are more luminant than darker ones
		assert.isTrue(lWhite > lYellow);
		assert.isTrue(lYellow > lDarkyellow);
		assert.isTrue(lYellow > lBlue);
		assert.isTrue(lBlue > lBlack);
	});

	it('should calculate contrast sensibly', function () {
		var black = new axe.commons.color.Color(0, 0, 0, 1);
		var transparent = new axe.commons.color.Color(0, 0, 0, 0);
		var white = new axe.commons.color.Color(255, 255, 255, 1);
		var yellow = new axe.commons.color.Color(255, 255, 0, 1);

		//Same foreground/background gives 1
		assert.equal(axe.commons.color.getContrast(black, black), 1);
		assert.equal(axe.commons.color.getContrast(transparent, black), 1);
		assert.equal(axe.commons.color.getContrast(white, white), 1);
		assert.equal(axe.commons.color.getContrast(yellow, yellow), 1);

		//contrast ratio is reversible
		assert.equal(axe.commons.color.getContrast(yellow, black), axe.commons.color.getContrast(black, yellow));
		assert.equal(axe.commons.color.getContrast(yellow, white), axe.commons.color.getContrast(white, yellow));

		//things that are more contrasty return higher values than things that are less contrasty
		assert.isTrue(axe.commons.color.getContrast(yellow, white) < axe.commons.color.getContrast(yellow, black));
		assert.isTrue(axe.commons.color.getContrast(yellow, black) < axe.commons.color.getContrast(white, black));
	});

	it('should flatten colors properly', function () {
		var halfblack = new axe.commons.color.Color(0, 0, 0, 0.5);
		var fullblack = new axe.commons.color.Color(0, 0, 0, 1);
		var transparent = new axe.commons.color.Color(0, 0, 0, 0);
		var white = new axe.commons.color.Color(255, 255, 255, 1);
		var gray = new axe.commons.color.Color(127.5, 127.5, 127.5, 1);
		var flat = axe.commons.color.flattenColors(halfblack, white);
		assert.equal(flat.red, gray.red);
		assert.equal(flat.green, gray.green);
		assert.equal(flat.blue, gray.blue);

		var flat2 = axe.commons.color.flattenColors(fullblack, white);
		assert.equal(flat2.red, fullblack.red);
		assert.equal(flat2.green, fullblack.green);
		assert.equal(flat2.blue, fullblack.blue);

		var flat3 = axe.commons.color.flattenColors(transparent, white);
		assert.equal(flat3.red, white.red);
		assert.equal(flat3.green, white.green);
		assert.equal(flat3.blue, white.blue);
	});

	it('should give sensible results for WCAG compliance', function () {
		var black = new axe.commons.color.Color(0, 0, 0, 1);
		var white = new axe.commons.color.Color(255, 255, 255, 1);
		var gray = new axe.commons.color.Color(128, 128, 128, 1);

		assert.isTrue(axe.commons.color.hasValidContrastRatio(black, white, 8, false).isValid);
		assert.isTrue(axe.commons.color.hasValidContrastRatio(black, white, 8, false).contrastRatio > 4.5);
		assert.isFalse(axe.commons.color.hasValidContrastRatio(black, black, 16, true).isValid);
		assert.isTrue(axe.commons.color.hasValidContrastRatio(black, black, 16, true).contrastRatio < 3);
		assert.isTrue(axe.commons.color.hasValidContrastRatio(white, gray, 24, false).isValid);
		assert.isTrue(axe.commons.color.hasValidContrastRatio(white, gray, 24, false).contrastRatio > 3);
		assert.isTrue(axe.commons.color.hasValidContrastRatio(white, gray, 20, true).isValid);
		assert.isTrue(axe.commons.color.hasValidContrastRatio(white, gray, 20, true).contrastRatio > 3);
		assert.isFalse(axe.commons.color.hasValidContrastRatio(white, gray, 8, false).isValid);
		assert.isTrue(axe.commons.color.hasValidContrastRatio(white, gray, 8, false).contrastRatio < 4.5);
	});

});
