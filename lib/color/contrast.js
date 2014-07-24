/*global color */

color.Color = function () {
	var red = 0;
	var green = 0;
	var blue = 0;
	var alpha = 255;
	var hexToInt = function (hex) {
		return parseInt(hex, 16);
	};

	var intToHex = function (num) {
		var hexStr = num.toString(16);
		if (hexStr.length === 1) {
			hexStr = '0' + hexStr;
		}
		return hexStr;
	};


/**
 * Set the color value based on a CSS hex string
 * @param  {string}  hex  The string value
 */
	this.setHex = function (hex) {
		hex = hex.substring(1); // get rid of the #
		var redStr = hex.substring(0, 2);
		var greenStr = hex.substring(2, 4);
		var blueStr = hex.substring(4, 6);
		red = hexToInt(redStr);
		green = hexToInt(greenStr);
		blue = hexToInt(blueStr);
	};

/**
 * Set the color value based on a CSS RGB/RGBA string
 * @param  {string}  rgb  The string value
 */
	this.setRGB = function (rgb) {
		rgb = rgb.trim();
		var from = rgb.indexOf('rgb(');
		if (from === -1) {
			from = rgb.indexOf('rgba(');
			if (from === -1) {
				return;
			}
			from += 4;
		} else {
			from += 3;
		}
		var to = rgb.indexOf(')');
		rgb = (rgb.substring(from + 1, to)).trim();

		var clrs = rgb.split(',');
		red = parseInt(clrs[0].trim(), 10);
		green = parseInt(clrs[1].trim(), 10);
		blue = parseInt(clrs[2].trim(), 10);
		if (clrs.length > 3) { alpha = parseInt(clrs[3].trim(), 10); }
	};

	this.red = function () {
		return red;
	};

	this.green = function () {
		return green;
	};

	this.blue = function () {
		return blue;
	};

	this.alpha = function () {
		return alpha;
	};

/**
 * Convert a color to a hex value
 * @return {string} The color hex
 */
	this.hexString = function () {
		return ('#' + intToHex(red) + intToHex(green) + intToHex(blue)).toUpperCase();
	};

};

/**
 * Get the relative luminance value for a color
 * @param  {object}  c  The color
 * @return {number} The luminance value, ranges from 0 to 1
 */
color.getRelativeLuminance = function (c) {
	var Rs = c.red() / 255;
	var Gs = c.green() / 255;
	var Bs = c.blue() / 255;

	var R, G, B;
	if (Rs <= 0.03928) {
		R = Rs / 12.92;
	} else {
		R = Math.pow(((Rs + 0.055) / 1.055), 2.4);
	}
	if (Gs <= 0.03928) {
		G = Gs / 12.92;
	} else {
		G = Math.pow(((Gs + 0.055) / 1.055), 2.4);
	}
	if (Bs <= 0.03928) {
		B = Bs / 12.92;
	} else {
		B = Math.pow(((Bs + 0.055) / 1.055), 2.4);
	}
	return (0.2126 * R + 0.7152 * G + 0.0722 * B);
};

/**
 * Get the contrast of two colors
 * @param  {object}  bgcolor  Background color
 * @param  {object}  fgcolor  Foreground color
 * @return {number} The contrast ratio
 */
color.getContrast = function (bgColor, fgColor) {
	var bL = color.getRelativeLuminance(bgColor);
	var fL = color.getRelativeLuminance(fgColor);
	if (bL === -1.0 || fL === -1.0) { return -1; }
	if (bL > fL) {
		//Assuming that lighter color will have more Relative Luminace
		return (bL + 0.05) / (fL + 0.05);
	}
	else {
		return (fL + 0.05) / (bL + 0.05);
	}
};

/**
 * Check whether certain text properties meet WCAG contrast rules
 * @param  {object}  name The name to convert
 * @param  {string}  bgcolor  Background color, as a word or CSS hex value
 * @param  {string}  fgcolor  Foreground color, as a word or CSS hex value
 * @param  {number}  fontSize  Font size of text
 * @param  {boolean}  bold  Whether the text is bold
 * @return {array} First element is boolean, second is number with contrast ratio
 */
color.areInGoodContrastWCAG2 = function (bgColor, fgColor, fontSize, bold) {
	var bg, fg, contrast, isSmallFont = false;

	bgColor = color.wordToHex(bgColor);
	fgColor = color.wordToHex(fgColor);
	bg = new color.Color();
	bg.setHex(bgColor);
	fg = new color.Color();
	fg.setHex(fgColor);
	contrast = color.getContrast(bg, fg);
	if (contrast === -1) {
		return [true, contrast];
	}
	fontSize = parseFloat(fontSize);
	if ((bold === true && (fontSize * 72 / 96) < 14) || (bold === false && (fontSize * 72 / 96) < 18)) {
		isSmallFont = true;
	}
	if (isSmallFont && contrast >= 4.5) {
		return [true, contrast];
	} else if (!isSmallFont && contrast >= 3) {
		return [true, contrast];
	} else {
		return [false, contrast];
	}
};
