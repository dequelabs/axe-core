import { Colorjs } from '../../core/imports';

const hexRegex = /^#[0-9a-f]{3,8}$/i;
const hslRegex = /hsl\(\s*([\d.]+)(rad|turn)/;

/**
 * @class Color
 * @memberof axe.commons.color
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number} alpha
 */
export default class Color {
  constructor(red, green, blue, alpha = 1) {
    /** @type {number} */
    this.red = red;

    /** @type {number} */
    this.green = green;

    /** @type {number} */
    this.blue = blue;

    /** @type {number} */
    this.alpha = alpha;
  }

  /**
   * Provide the hex string value for the color
   * @method toHexString
   * @memberof axe.commons.color.Color
   * @instance
   * @return {string}
   */
  toHexString() {
    var redString = Math.round(this.red).toString(16);
    var greenString = Math.round(this.green).toString(16);
    var blueString = Math.round(this.blue).toString(16);
    return (
      '#' +
      (this.red > 15.5 ? redString : '0' + redString) +
      (this.green > 15.5 ? greenString : '0' + greenString) +
      (this.blue > 15.5 ? blueString : '0' + blueString)
    );
  }

  toJSON() {
    const { red, green, blue, alpha } = this;
    return { red, green, blue, alpha };
  }

  /**
   * Parse any valid color string and assign its values to "this"
   * @method parseString
   * @memberof axe.commons.color.Color
   * @instance
   */
  parseString(colorString) {
    // Colorjs currently does not support rad or turn angle values
    // @see https://github.com/LeaVerou/color.js/issues/311
    colorString = colorString.replace(hslRegex, (match, angle, unit) => {
      const value = angle + unit;

      switch (unit) {
        case 'rad':
          return match.replace(value, radToDeg(angle));
        case 'turn':
          return match.replace(value, turnToDeg(angle));
      }
    });

    try {
      // srgb values are between 0 and 1
      const color = new Colorjs(colorString).to('srgb');
      // when converting from one color space to srgb
      // the values of rgb may be above 1 so we need to clamp them
      // we also need to round the final value as rgb values don't have decimals
      this.red = Math.round(clamp(color.r, 0, 1) * 255);
      this.green = Math.round(clamp(color.g, 0, 1) * 255);
      this.blue = Math.round(clamp(color.b, 0, 1) * 255);
      // color.alpha is a Number object so convert it to a number
      this.alpha = +color.alpha;
    } catch (err) {
      throw new Error(`Unable to parse color "${colorString}"`);
    }

    return this;
  }

  /**
   * Set the color value based on a CSS RGB/RGBA string
   * @method parseRgbString
   * @deprecated
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {string}  rgb  The string value
   */
  parseRgbString(colorString) {
    this.parseString(colorString);
  }

  /**
   * Set the color value based on a CSS RGB/RGBA string
   * @method parseHexString
   * @deprecated
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {string}  rgb  The string value
   */
  parseHexString(colorString) {
    if (!colorString.match(hexRegex) || [6, 8].includes(colorString.length)) {
      return;
    }

    this.parseString(colorString);
  }

  /**
   * Set the color value based on a CSS RGB/RGBA string
   * @method parseColorFnString
   * @deprecated
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {string}  rgb  The string value
   */
  parseColorFnString(colorString) {
    this.parseString(colorString);
  }

  /**
   * Get the relative luminance value
   * using algorithm from http://www.w3.org/WAI/GL/wiki/Relative_luminance
   * @method getRelativeLuminance
   * @memberof axe.commons.color.Color
   * @instance
   * @return {number} The luminance value, ranges from 0 to 1
   */
  getRelativeLuminance() {
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
  }
}

// clamp a value between two numbers (inclusive)
function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

// convert radians to degrees
function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

// convert turn to degrees
function turnToDeg(turn) {
  return turn * 360;
}
