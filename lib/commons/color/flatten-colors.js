import Color from './color';

// how to combine background and foreground colors together when using
// the CSS property `mix-blend-mode`. Defaults to `normal`
// @see https://www.w3.org/TR/compositing-1/#blendingseparable
const blendFunctions = {
  /*eslint no-bitwise: 0 */
  normal(Cb, Cs) {
    return Cs;
  },
  multiply(Cb, Cs) {
    return (Cs * Cb) / 255;
  },
  screen(Cb, Cs) {
    return Cb + Cs - (Cb * Cs) / 255;
  },
  overlay(Cb, Cs) {
    return Cb + Cs; // need to add
  },
  darken(Cb, Cs) {
    return Math.min(Cb, Cs);
  },
  lighten(Cb, Cs) {
    return Math.max(Cb, Cs);
  },
  'color-dodge'(Cb, Cs) {
    // utilise bitwise operation in the algorithm to get a accurate colour
    // @see http://www.pegtop.net/delphi/articles/blendmodes/dodge.htm
    // @see https://www.w3.org/TR/compositing-1/#blendingcolordodge
    return Cb === 255
      ? 255
      : Cs === 0
      ? 0
      : Math.min(255, (Cb << 8) / (255 - Cs));
  },
  'color-burn'(Cb, Cs) {
    // utilise bitwise operation in the algorithm to get a accurate colour
    // @see http://www.pegtop.net/delphi/articles/blendmodes/burn.htm
    // @see https://www.w3.org/TR/compositing-1/#blendingcolorburn
    if (Cb === 0) {
      return 0;
    } else {
      const darkenBackdropColour = 255 - ((255 - Cb) << 8) / Cs;
      return darkenBackdropColour < 0 ? 0 : darkenBackdropColour;
    }
  },
  'hard-light'(Cb, Cs) {
    return Cb < 128 ? (Cb * Cs) >> 7 : 255 - (((255 - Cs) * (255 - Cb)) >> 7);
  },
  'soft-light'(Cb, Cs) {
    return Cb + Cs; // need to add
  },
  difference(Cb, Cs) {
    return Math.abs(Cb - Cs);
  },
  exclusion(Cb, Cs) {
    return Cb + Cs - (2 * Cb * Cs) / 255;
  }
};

// Simple Alpha Compositing written as non-premultiplied.
// formula: Rrgb × Ra = Srgb × Sa + Drgb × Da × (1 − Sa)
// Cs: the source color
// αs: the source alpha
// Cb: the backdrop color
// αb: the backdrop alpha
// @see https://www.w3.org/TR/compositing-1/#simplealphacompositing
// @see https://www.w3.org/TR/compositing-1/#blending
// @see https://ciechanow.ski/alpha-compositing/
function simpleAlphaCompositing(Cs, αs, Cb, αb, blendMode) {
  // RGB color space doesn't have decimal values so we will follow what browsers do and round
  // e.g. rgb(255.2, 127.5, 127.8) === rgb(255, 128, 128)

  return Math.round(
    αs * (1 - αb) * Cs +
      αs * αb * blendFunctions[blendMode](Cb, Cs) +
      (1 - αs) * αb * Cb
  );
}

/**
 * Combine the two given color according to alpha blending.
 * @method flattenColors
 * @memberof axe.commons.color.Color
 * @instance
 * @param {Color} fgColor Foreground color
 * @param {Color} bgColor Background color
 * @return {Color} Blended color
 */
function flattenColors(fgColor, bgColor, blendMode = 'normal') {
  // foreground is the "source" color and background is the "backdrop" color
  const r = simpleAlphaCompositing(
    fgColor.red,
    fgColor.alpha,
    bgColor.red,
    bgColor.alpha,
    blendMode
  );
  const g = simpleAlphaCompositing(
    fgColor.green,
    fgColor.alpha,
    bgColor.green,
    bgColor.alpha,
    blendMode
  );
  const b = simpleAlphaCompositing(
    fgColor.blue,
    fgColor.alpha,
    bgColor.blue,
    bgColor.alpha,
    blendMode
  );

  // formula: αo = αs + αb x (1 - αs)
  // clamp alpha between 0 and 1
  const a = Math.max(
    0,
    Math.min(fgColor.alpha + bgColor.alpha * (1 - fgColor.alpha), 1)
  );

  return new Color(r, g, b, a);
}

export default flattenColors;
