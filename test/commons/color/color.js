describe('color.Color', function() {
	'use strict';

	it('should set values properly via RGB', function() {
		var c = new axe.commons.color.Color();
		c.parseRgbString('rgb(17, 34, 51)');
		assert.equal(c.red, 17);
		assert.equal(c.green, 34);
		assert.equal(c.blue, 51);
		assert.equal(c.alpha, 1);
	});

	it('should set values properly via RGBA', function() {
		var c = new axe.commons.color.Color();
		c.parseRgbString('rgba(17, 34, 51, 0)');
		assert.equal(c.red, 17);
		assert.equal(c.green, 34);
		assert.equal(c.blue, 51);
		assert.equal(c.alpha, 0);
	});

	it('should return hex values properly', function() {
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

	it('should return hex values properly when they are non-integery', function() {
		var black = new axe.commons.color.Color(0, 0, 0, 1);
		var white = new axe.commons.color.Color(255, 255, 255, 0.1);
		var grayish = axe.commons.color.flattenColors(white, black);
		assert.equal(grayish.toHexString(), '#1a1a1a');
	});

	it('should calculate luminance sensibly', function() {
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
});
