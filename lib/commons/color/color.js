import { Colorjs, ArrayFrom } from '../../core/imports';

const hexRegex = /^#[0-9a-f]{3,8}$/i;
const hslRegex = /hsl\(\s*([-\d.]+)(rad|turn)/;

/**
 * @class Color
 * @memberof axe.commons.color
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number} alpha
 */
export default class Color {
  // color channel values typically in the range of 0-1 (can go below or above)
  #r;
  #g;
  #b;
  // color component values resolved to the sRGB color space (0-255)
  #red;
  #green;
  #blue;

  constructor(red, green, blue, alpha = 1) {
    if (red instanceof Color) {
      // preserve out of gamut values
      const { r, g, b } = red;
      this.r = r;
      this.g = g;
      this.b = b;
      this.alpha = red.alpha;
      return;
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

  get r() {
    return this.#r;
  }

  set r(value) {
    this.#r = value;
    this.#red = Math.round(clamp(value, 0, 1) * 255);
  }

  get g() {
    return this.#g;
  }

  set g(value) {
    this.#g = value;
    this.#green = Math.round(clamp(value, 0, 1) * 255);
  }

  get b() {
    return this.#b;
  }

  set b(value) {
    this.#b = value;
    this.#blue = Math.round(clamp(value, 0, 1) * 255);
  }

  get red() {
    return this.#red;
  }

  set red(value) {
    this.#r = value / 255;
    this.#red = clamp(value, 0, 255);
  }

  get green() {
    return this.#green;
  }

  set green(value) {
    this.#g = value / 255;
    this.#green = clamp(value, 0, 255);
  }

  get blue() {
    return this.#blue;
  }

  set blue(value) {
    this.#b = value / 255;
    this.#blue = clamp(value, 0, 255);
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
    // Colorjs <v0.5.0 does not support rad or turn angle values
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
      // revert prototype.js override of Array.from
      // in order to get color-contrast working
      // @see https://github.com/dequelabs/axe-core/issues/4428
      let prototypeArrayFrom;
      if ('Prototype' in window && 'Version' in window.Prototype) {
        prototypeArrayFrom = Array.from;
        Array.from = ArrayFrom;
      }

      // srgb values are between 0 and 1
      const color = new Colorjs(colorString)
        .toGamut({
          space: 'srgb',
          method: 'clip'
        })
        .to('srgb');

      if (prototypeArrayFrom) {
        Array.from = prototypeArrayFrom;
        prototypeArrayFrom = null;
      }

      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      // color.alpha is a Number object so convert it to a number
      this.alpha = +color.alpha;
    } catch {
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
    const { r: rSRGB, g: gSRGB, b: bSRGB } = this;

    const r =
      rSRGB <= 0.04045 ? rSRGB / 12.92 : Math.pow((rSRGB + 0.055) / 1.055, 2.4);
    const g =
      gSRGB <= 0.04045 ? gSRGB / 12.92 : Math.pow((gSRGB + 0.055) / 1.055, 2.4);
    const b =
      bSRGB <= 0.04045 ? bSRGB / 12.92 : Math.pow((bSRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Add a value to the color channels
   * @private
   * @param  {number}  value  The value to add
   * @return {Color} A new color instance
   */
  #add(value) {
    const C = new Color(this);
    C.r += value;
    C.g += value;
    C.b += value;
    return C;
  }

  /**
   * Get the luminosity of a color
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method getLuminosity
   * @memberof axe.commons.color.Color
   * @instance
   * @return {number} The luminosity of the color
   */
  getLuminosity() {
    return 0.3 * this.r + 0.59 * this.g + 0.11 * this.b;
  }

  /**
   * Set the luminosity of a color
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method setLuminosity
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {number}  L  The luminosity
   * @return {Color} A new color instance
   */
  setLuminosity(L) {
    const d = L - this.getLuminosity();
    return this.#add(d).clip();
  }

  /**
   * Get the saturation of a color
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method getSaturation
   * @memberof axe.commons.color.Color
   * @instance
   * @return {number} The saturation of the color
   */
  getSaturation() {
    return Math.max(this.r, this.g, this.b) - Math.min(this.r, this.g, this.b);
  }

  /**
   * Set the saturation of a color
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
      { name: 'r', value: C.r },
      { name: 'g', value: C.g },
      { name: 'b', value: C.b }
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
    const n = Math.min(C.r, C.g, C.b);
    const x = Math.max(C.r, C.g, C.b);

    if (n < 0) {
      C.r = L + ((C.r - L) * L) / (L - n);
      C.g = L + ((C.g - L) * L) / (L - n);
      C.b = L + ((C.b - L) * L) / (L - n);
    }

    if (x > 1) {
      C.r = L + ((C.r - L) * (1 - L)) / (x - L);
      C.g = L + ((C.g - L) * (1 - L)) / (x - L);
      C.b = L + ((C.b - L) * (1 - L)) / (x - L);
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
