/*global color */

/**
 * @constructor
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number} alpha
 */
color.Color = function (red, green, blue, alpha) {
	/** @type {number} */
	this.red = red;

	/** @type {number} */
	this.green = green;

	/** @type {number} */
	this.blue = blue;

	/** @type {number} */
	this.alpha = alpha;

	/** 
	 * Set the color value based on a CSS RGB/RGBA string
	 * @param  {string}  rgb  The string value
	 */
	this.parseRgbString = function (colorString) {
		var rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)$/;
		var match = colorString.match(rgbRegex);

		if (match) {
			this.red = parseInt(match[1], 10);
			this.green = parseInt(match[2], 10);
			this.blue = parseInt(match[3], 10);
			this.alpha = 1;
			return;
		}

		var rgbaRegex = /^rgba\((\d+), (\d+), (\d+), (\d*(\.\d+)?)\)/;
		match = colorString.match(rgbaRegex);
		if (match) {
			this.red = parseInt(match[1], 10);
			this.green = parseInt(match[2], 10);
			this.blue = parseInt(match[3], 10);
			this.alpha = parseFloat(match[4]);
			return;
		}
	};

	/**
	 * Get the relative luminance value
	 * using algorithm from http://www.w3.org/WAI/GL/wiki/Relative_luminance
	 * @return {number} The luminance value, ranges from 0 to 1
	 */
	this.getRelativeLuminance = function () {
		var rSRGB = this.red / 255;
		var gSRGB = this.green / 255;
		var bSRGB = this.blue / 255;

		var r = rSRGB <= 0.03928 ? rSRGB / 12.92 : Math.pow(((rSRGB + 0.055) / 1.055), 2.4);
		var g = gSRGB <= 0.03928 ? gSRGB / 12.92 : Math.pow(((gSRGB + 0.055) / 1.055), 2.4);
		var b = bSRGB <= 0.03928 ? bSRGB / 12.92 : Math.pow(((bSRGB + 0.055) / 1.055), 2.4);

		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};
};

/**
 * Combine the two given color according to alpha blending.
 * @param {Color} fgColor
 * @param {Color} bgColor
 * @return {Color}
 */
color.flattenColors = function (fgColor, bgColor) {
	var alpha = fgColor.alpha;
	var r = ((1 - alpha) * bgColor.red) + (alpha * fgColor.red);
	var g  = ((1 - alpha) * bgColor.green) + (alpha * fgColor.green);
	var b = ((1 - alpha) * bgColor.blue) + (alpha * fgColor.blue);
	var a = fgColor.alpha + (bgColor.alpha * (1 - fgColor.alpha));

	return new color.Color(r, g, b, a);
};

/**
 * Get the contrast of two colors
 * @param  {Color}  bgcolor  Background color
 * @param  {Color}  fgcolor  Foreground color
 * @return {number} The contrast ratio
 */
color.getContrast = function (bgColor, fgColor) {
	if (!fgColor || !bgColor) { return null; }

	if (fgColor.alpha < 1) {
		fgColor = color.flattenColors(fgColor, bgColor);
	}

	var bL = bgColor.getRelativeLuminance();
	var fL = fgColor.getRelativeLuminance();

	return (Math.max(fL, bL) + 0.05) / (Math.min(fL, bL) + 0.05);
};

/**
 * Check whether certain text properties meet WCAG contrast rules
 * @param  {Color}  bgcolor  Background color
 * @param  {Color}  fgcolor  Foreground color
 * @param  {number}  fontSize  Font size of text, in pixels
 * @param  {boolean}  isBold  Whether the text is bold
 * @return {boolean} Whether contrast ratio is valid
 */
color.hasValidContrastRatio = function (bg, fg, fontSize, isBold) {
	var contrast = color.getContrast(bg, fg);
	var isSmallFont = (isBold && (fontSize * 72 / 96) < 14) || (!isBold && (fontSize * 72 / 96) < 18);

	return (isSmallFont && contrast >= 4.5) || (!isSmallFont && contrast >= 3);
};
