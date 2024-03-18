import Color from './color';

// @see https://www.w3.org/TR/compositing-1/#blendingnonseparable
const nonSeparableBlendModes = ['hue', 'saturation', 'color', 'luminosity'];

// how to combine background and foreground colors together when using
// the CSS property `mix-blend-mode`. Defaults to `normal`
// @see https://www.w3.org/TR/compositing-1/#blendingseparable
const blendFunctions = {
  normal(Cb, Cs) {
    return Cs;
  },
  multiply(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingmultiply
    return Cs * Cb;
  },
  screen(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingscreen
    return Cb + Cs - Cb * Cs;
  },
  overlay(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingoverlay
    return this['hard-light'](Cs, Cb);
  },
  darken(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingdarken
    return Math.min(Cb, Cs);
  },
  lighten(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendinglighten
    return Math.max(Cb, Cs);
  },
  'color-dodge'(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingcolordodge
    return Cb === 0 ? 0 : Cs === 1 ? 1 : Math.min(1, Cb / (1 - Cs));
  },
  'color-burn'(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingcolorburn
    return Cb === 1 ? 1 : Cs === 0 ? 0 : 1 - Math.min(1, (1 - Cb) / Cs);
  },
  'hard-light'(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendinghardlight

    return Cs <= 0.5 ? this.multiply(Cb, 2 * Cs) : this.screen(Cb, 2 * Cs - 1);
  },
  'soft-light'(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingsoftlight
    if (Cs <= 0.5) {
      return Cb - (1 - 2 * Cs) * Cb * (1 - Cb);
    } else {
      const D = Cb <= 0.25 ? ((16 * Cb - 12) * Cb + 4) * Cb : Math.sqrt(Cb);
      return Cb + (2 * Cs - 1) * (D - Cb);
    }
  },
  difference(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingdifference
    return Math.abs(Cb - Cs);
  },
  exclusion(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingexclusion
    return Cb + Cs - 2 * Cb * Cs;
  },

  // non-separate color function take the entire color object
  // and not individual color components (red, green, blue)
  hue(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendinghue
    return Cs.setSaturation(Cb.getSaturation()).setLuminosity(
      Cb.getLuminosity()
    );
  },
  saturation(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingsaturation
    return Cb.setSaturation(Cs.getSaturation()).setLuminosity(
      Cb.getLuminosity()
    );
  },
  color(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingcolor
    return Cs.setLuminosity(Cb.getLuminosity());
  },
  luminosity(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingluminosity
    return Cb.setLuminosity(Cs.getLuminosity());
  }
};

/**
 * Combine the two given color according to alpha blending.
 * @method flattenColors
 * @memberof axe.commons.color.Color
 * @instance
 * @param {Color} sourceColor Foreground color
 * @param {Color} backdrop Background color
 * @return {Color} Blended color
 */
export default function flattenColors(
  sourceColor,
  backdrop,
  blendMode = 'normal'
) {
  const blendingResult = blend(backdrop, sourceColor, blendMode);

  // foreground is the "source" color and background is the "backdrop" color
  const r = simpleAlphaCompositing(
    sourceColor.red,
    sourceColor.alpha,
    backdrop.red,
    backdrop.alpha,
    // we don't want to round the blended value
    blendingResult.r * 255
  );
  const g = simpleAlphaCompositing(
    sourceColor.green,
    sourceColor.alpha,
    backdrop.green,
    backdrop.alpha,
    blendingResult.g * 255
  );
  const b = simpleAlphaCompositing(
    sourceColor.blue,
    sourceColor.alpha,
    backdrop.blue,
    backdrop.alpha,
    blendingResult.b * 255
  );

  // formula: αo = αs + αb x (1 - αs)
  // clamp alpha between 0 and 1
  const αo = clamp(
    sourceColor.alpha + backdrop.alpha * (1 - sourceColor.alpha),
    0,
    1
  );
  if (αo === 0) {
    return new Color(r, g, b, αo);
  }

  // simple alpha compositing gives premultiplied values, but our Color
  // constructor takes unpremultiplied values. So we need to divide the
  // final color values by the final alpha
  // formula: Co = co / αo
  // @see https://www.w3.org/TR/compositing-1/#simplealphacompositing
  // @see https://github.com/w3c/fxtf-drafts/issues/440#issuecomment-956418953
  //
  // RGB color space doesn't have decimal values so we will follow what browsers do and round
  // e.g. rgb(255.2, 127.5, 127.8) === rgb(255, 128, 128)
  const Cr = Math.round(r / αo);
  const Cg = Math.round(g / αo);
  const Cb = Math.round(b / αo);

  return new Color(Cr, Cg, Cb, αo);
}

// Simple Alpha Compositing written as non-premultiplied.
// formula: Rrgb × Ra = Srgb × Sa + Drgb × Da × (1 − Sa)
// Cs: the source color
// αs: the source alpha
// Cb: the backdrop color
// αb: the backdrop alpha
// @see https://www.w3.org/TR/compositing-1/#simplealphacompositing
// @see https://www.w3.org/TR/compositing-1/#blending
// @see https://ciechanow.ski/alpha-compositing/
function simpleAlphaCompositing(Cs, αs, Cb, αb, blendingResult) {
  return αs * (1 - αb) * Cs + αs * αb * blendingResult + (1 - αs) * αb * Cb;
}

// clamp a value between two numbers (inclusive)
function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

function blend(Cb, Cs, blendMode) {
  if (nonSeparableBlendModes.includes(blendMode)) {
    return blendFunctions[blendMode](Cb, Cs);
  }

  const C = new Color();
  ['r', 'g', 'b'].forEach(channel => {
    C[channel] = blendFunctions[blendMode](Cb[channel], Cs[channel]);
  });
  return C;
}
