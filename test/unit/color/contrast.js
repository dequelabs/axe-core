describe('color.Color', function () {
	'use strict';

	it('should set values properly via hex', function () {
		var c = new kslib.color.Color();
		c.setHex('#112233');
		assert.equal(c.red(), 17);
		assert.equal(c.green(), 34);
		assert.equal(c.blue(), 51);
		assert.equal(c.alpha(), 255);
	});

	it('should set values properly via RGB', function () {
		var c = new kslib.color.Color();
		c.setRGB('rgb(17, 34, 51)');
		assert.equal(c.red(), 17);
		assert.equal(c.green(), 34);
		assert.equal(c.blue(), 51);
		assert.equal(c.alpha(), 255);
	});

	it('should set values properly via RGBA', function () {
		var c = new kslib.color.Color();
		c.setRGB('rgba(17, 34, 51, 0)');
		assert.equal(c.red(), 17);
		assert.equal(c.green(), 34);
		assert.equal(c.blue(), 51);
		assert.equal(c.alpha(), 0);
	});

	it('should return hex values properly', function () {
		var c = new kslib.color.Color();
		c.setRGB('rgba(17, 34, 51, 0)');
		assert.equal(c.red(), 17);
		assert.equal(c.green(), 34);
		assert.equal(c.blue(), 51);
		assert.equal(c.alpha(), 0);
		assert.equal(c.hexString(), '#112233');
	});
	
	it('should calculate luminance sensibly', function () {
		var black = new kslib.color.Color();
		var white = new kslib.color.Color();
		var yellow = new kslib.color.Color();
		var darkyellow = new kslib.color.Color();
		var blue = new kslib.color.Color();
		black.setHex('#000000');
		white.setHex('#ffffff');
		yellow.setHex('#ffff00');
		darkyellow.setHex('#999900');
		blue.setHex('#0000ff');
		var lBlack = kslib.color.getRelativeLuminance(black);
		var lWhite = kslib.color.getRelativeLuminance(white);
		var lYellow = kslib.color.getRelativeLuminance(yellow);
		var lDarkyellow = kslib.color.getRelativeLuminance(darkyellow);
		var lBlue = kslib.color.getRelativeLuminance(blue);

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
		var black = new kslib.color.Color();
		var white = new kslib.color.Color();
		var yellow = new kslib.color.Color();
		black.setHex('#000000');
		white.setHex('#ffffff');
		yellow.setHex('#ffff00');

		//Same foreground/background gives 1
		assert.equal(kslib.color.getContrast(black, black), 1);
		assert.equal(kslib.color.getContrast(white, white), 1);
		assert.equal(kslib.color.getContrast(yellow, yellow), 1);

		//contrast ratio is reversible
		assert.equal(kslib.color.getContrast(yellow, black), kslib.color.getContrast(black, yellow));
		assert.equal(kslib.color.getContrast(yellow, white), kslib.color.getContrast(white, yellow));

		//things that are more contrasty return higher values than things that are less contrasty
		assert.isTrue(kslib.color.getContrast(yellow, white) < kslib.color.getContrast(yellow, black));
		assert.isTrue(kslib.color.getContrast(yellow, black) < kslib.color.getContrast(white, black));
	});

	it('should give sensible results for WCAG compliance', function () {
		assert.isTrue(kslib.color.areInGoodContrastWCAG2('black', 'white', 16, true)[0]);
		assert.isFalse(kslib.color.areInGoodContrastWCAG2('black', 'black', 16, true)[0]);
		assert.isTrue(kslib.color.areInGoodContrastWCAG2('white', 'gray', 24, false)[0]);
		assert.isTrue(kslib.color.areInGoodContrastWCAG2('white', 'gray', 20, true)[0]);
		assert.isFalse(kslib.color.areInGoodContrastWCAG2('white', 'gray', 8, false)[0]);
	});

});
