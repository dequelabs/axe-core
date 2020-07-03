import standards from '../../standards';

const prefixZero = str => (str[0] === '.' ? '0' : '') + str;

/**
 * @class Color
 * @memberof axe.commons.color
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number} alpha
 */
function Color(red, green, blue, alpha) {
	/** @type {number} */
	this.red = red;

	/** @type {number} */
	this.green = green;

	/** @type {number} */
	this.blue = blue;

	/** @type {number} */
	this.alpha = alpha;

	/**
	 * Provide the hex string value for the color
	 * @method toHexString
	 * @memberof axe.commons.color.Color
	 * @instance
	 * @return {string}
	 */
	this.toHexString = function() {
		var redString = Math.round(this.red).toString(16);
		var greenString = Math.round(this.green).toString(16);
		var blueString = Math.round(this.blue).toString(16);
		return (
			'#' +
			(this.red > 15.5 ? redString : '0' + redString) +
			(this.green > 15.5 ? greenString : '0' + greenString) +
			(this.blue > 15.5 ? blueString : '0' + blueString)
		);
	};

	const rgbRegex = /^rgb\(([0-9.]+),\s*([0-9.]+),\s*([0-9.]+)\)$/i;
	const rgbaRegex = /^rgba\(([0-9.]+),\s*([0-9.]+),\s*([0-9.]+),\s*([0-9.]*(\.[0-9.]+)?)\)$/i;
	const hexRegex = /^#[0-9a-f]{3,8}$/i;

	this.parseString = function(colorString) {
		// IE occasionally returns named colors instead of RGB(A) values
		if (standards.cssColors[colorString]) {
			const [red, green, blue] = standards.cssColors[colorString];
			this.red = red;
			this.green = green;
			this.blue = blue;
			this.alpha = 1;
			return;
		}
		if (colorString.match(rgbRegex) || colorString.match(rgbaRegex)) {
			this.parseRgbString(colorString);
			return;
		}
		if (colorString.match(hexRegex)) {
			this.parseHexString(colorString);
			return;
		}
		throw new Error(`Unable to parse color "${colorString}"`);
	};

	/**
	 * Set the color value based on a CSS RGB/RGBA string
	 * @method parseRgbString
	 * @memberof axe.commons.color.Color
	 * @instance
	 * @param  {string}  rgb  The string value
	 */
	this.parseRgbString = function(colorString) {
		// IE can pass transparent as value instead of rgba
		if (colorString === 'transparent') {
			this.red = 0;
			this.green = 0;
			this.blue = 0;
			this.alpha = 0;
			return;
		}

		var match = colorString.match(rgbRegex) || colorString.match(rgbaRegex);
		if (!match) {
			return;
		}
		this.red = parseFloat(match[1], 10);
		this.green = parseFloat(match[2], 10);
		this.blue = parseFloat(match[3], 10);

		if (!match[4]) {
			this.alpha = 1;
		} else {
			// alpha values can be between 0 and 1, with browsers having
			// different floating point precision. for example,
			// 'rgba(0,0,0,0.5)' results in 'rgba(0,0,0,0.498039)' in Safari
			// when getting the computed style background-color property. to
			// fix this, we'll round all alpha values to 2 decimal points.
			const alphaFloat = parseFloat(prefixZero(match[4]));
			this.alpha = Math.round(alphaFloat * 100) / 100;
		}
	};

	this.parseHexString = function(colorString) {
		if (!colorString.match(hexRegex) || [6, 8].includes(colorString.length)) {
			return;
		}
		colorString = colorString.replace('#', '');
		if (colorString.length < 6) {
			const [r, g, b, a] = colorString;
			colorString = r + r + g + g + b + b;
			if (a) {
				colorString += a + a;
			}
		}

		var aRgbHex = colorString.match(/.{1,2}/g);
		this.red = parseInt(aRgbHex[0], 16);
		this.green = parseInt(aRgbHex[1], 16);
		this.blue = parseInt(aRgbHex[2], 16);
		if (aRgbHex[3]) {
			this.alpha = parseInt(aRgbHex[3], 16) / 255;
		} else {
			this.alpha = 1;
		}
	};

	/**
	 * Get the relative luminance value
	 * using algorithm from http://www.w3.org/WAI/GL/wiki/Relative_luminance
	 * @method getRelativeLuminance
	 * @memberof axe.commons.color.Color
	 * @instance
	 * @return {number} The luminance value, ranges from 0 to 1
	 */
	this.getRelativeLuminance = function() {
		var rSRGB = this.red / 255;
		var gSRGB = this.green / 255;
		var bSRGB = this.blue / 255;

		var r =
			rSRGB <= 0.03928 ? rSRGB / 12.92 : Math.pow((rSRGB + 0.055) / 1.055, 2.4);
		var g =
			gSRGB <= 0.03928 ? gSRGB / 12.92 : Math.pow((gSRGB + 0.055) / 1.055, 2.4);
		var b =
			bSRGB <= 0.03928 ? bSRGB / 12.92 : Math.pow((bSRGB + 0.055) / 1.055, 2.4);

		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};
}

export default Color;
