import Color from './color';

// how to combine background and foreground colors together when using
// the CSS property `mix-blend-mode`. Defaults to `normal`
// @see https://www.w3.org/TR/compositing-1/#blendingseparable
const blendFunctions = {
  normal(Cb, Cs) {
    return Cs;
  },
  multiply(Cb, Cs) {
    return (Cs * Cb) / 255;
  }
  // screen(Cb, Cs) {
  //   return null;
  // },
  // overlay(Cb, Cs) {
  //   return null;
  // },
  // darken(Cb, Cs) {
  //   return null;
  // },
  // lighten(Cb, Cs) {
  //   return null;
  // },
  // colorDodge(Cb, Cs) {
  //   return null;
  // },
  // colorBurn(Cb, Cs) {
  //   return null;
  // },
  // hardLight(Cb, Cs) {
  //   return null;
  // },
  // softLight(Cb, Cs) {
  //   return null;
  // },
  // difference(Cb, Cs) {
  //   return null;
  // },
  // exclusion(Cb, Cs) {
  //   return null;
  // }
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
