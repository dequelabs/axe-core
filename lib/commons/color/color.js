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
    if (red instanceof Color) {
      ({ red, green, blue, alpha } = red);
    }

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
    const redString = Math.round(this.red).toString(16);
    const greenString = Math.round(this.green).toString(16);
    const blueString = Math.round(this.blue).toString(16);
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
    const { red: rSRGB, green: gSRGB, blue: bSRGB } = this.normalize();

    const r =
      rSRGB <= 0.03928 ? rSRGB / 12.92 : Math.pow((rSRGB + 0.055) / 1.055, 2.4);
    const g =
      gSRGB <= 0.03928 ? gSRGB / 12.92 : Math.pow((gSRGB + 0.055) / 1.055, 2.4);
    const b =
      bSRGB <= 0.03928 ? bSRGB / 12.92 : Math.pow((bSRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Normalize the color to RGB values between 0-1
   * @method normalize
   * @memberof axe.commons.color.Color
   * @instance
   * @return {Color} A new color instance with RGB values between 0-1
   */
  normalize() {
    return new Color(
      this.red / 255,
      this.green / 255,
      this.blue / 255,
      this.alpha
    );
  }

  /**
   * Scale the color by a value
   * @method scale
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {number}  value  The value to scale by
   * @return {Color} A new color instance
   */
  scale(value = 255) {
    return new Color(
      this.red * value,
      this.green * value,
      this.blue * value,
      this.alpha
    );
  }

  /**
   * Add a value to the color
   * @method add
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {number}  value  The value to add
   * @return {Color} A new color instance
   */
  add(value) {
    return new Color(
      this.red + value,
      this.green + value,
      this.blue + value,
      this.alpha
    );
  }

  /**
   * Get the luminosity of a color. Color should be normalized before calling.
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method getLuminosity
   * @memberof axe.commons.color.Color
   * @instance
   * @return {number} The luminosity of the color
   */
  getLuminosity() {
    return 0.3 * this.red + 0.59 * this.green + 0.11 * this.blue;
  }

  /**
   * Set the luminosity of a color. Color should be normalized before calling.
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method setLuminosity
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {number}  L  The luminosity
   * @return {Color} A new color instance
   */
  setLuminosity(L) {
    const d = L - this.getLuminosity();
    return this.add(d).clip();
  }

  /**
   * Get the saturation of a color. Color should be normalized before calling.
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method getSaturation
   * @memberof axe.commons.color.Color
   * @instance
   * @return {number} The saturation of the color
   */
  getSaturation() {
    return (
      Math.max(this.red, this.green, this.blue) -
      Math.min(this.red, this.green, this.blue)
    );
  }

  /**
   * Set the saturation of a color. Color should be normalized before calling.
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method setSaturation
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {number}  s  The saturation
   * @return {Color} A new color instance
   */
  setSaturation(s) {
    const C = new Color(this);
    const colorEntires = [
      { name: 'red', value: C.red },
      { name: 'green', value: C.green },
      { name: 'blue', value: C.blue }
    ];

    // find the min, mid, and max values of the color components
    const [Cmin, Cmid, Cmax] = colorEntires.sort((a, b) => {
      return a.value - b.value;
    });

    if (Cmax.value > Cmin.value) {
      Cmid.value = ((Cmid.value - Cmin.value) * s) / (Cmax.value - Cmin.value);
      Cmax.value = s;
    } else {
      Cmid.value = Cmax.value = 0;
    }

    Cmin.value = 0;

    C[Cmax.name] = Cmax.value;
    C[Cmin.name] = Cmin.value;
    C[Cmid.name] = Cmid.value;
    return C;
  }

  /**
   * Clip the color between RGB 0-1 accounting for the luminosity of the color. Color must be normalized before calling.
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method clip
   * @memberof axe.commons.color.Color
   * @instance
   * @return {Color} A new color instance clipped between 0-1
   */
  clip() {
    const C = new Color(this);
    const L = C.getLuminosity();
    const n = Math.min(C.red, C.green, C.blue);
    const x = Math.max(C.red, C.green, C.blue);

    if (n < 0) {
      C.red = L + ((C.red - L) * L) / (L - n);
      C.green = L + ((C.green - L) * L) / (L - n);
      C.blue = L + ((C.blue - L) * L) / (L - n);
    }

    if (x > 1) {
      C.red = L + ((C.red - L) * (1 - L)) / (x - L);
      C.green = L + ((C.green - L) * (1 - L)) / (x - L);
      C.blue = L + ((C.blue - L) * (1 - L)) / (x - L);
    }

    return C;
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
