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
  // an not individual color components (red, green, blue)
  hue(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendinghue
    return setLuminosity(setSaturation(Cs, saturation(Cb)), luminosity(Cb));
  },
  saturation(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingsaturation
    return setLuminosity(setSaturation(Cb, saturation(Cs)), luminosity(Cb));
  },
  color(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingcolor
    return setLuminosity(Cs, luminosity(Cb));
  },
  luminosity(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingluminosity
    return setLuminosity(Cb, luminosity(Cs));
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
  let blendingResult;
  if (nonSeparableBlendModes.includes(blendMode)) {
    // Note: Cs and Cb values need to be between 0 and 1 inclusive for the blend function
    // @see https://www.w3.org/TR/compositing-1/#simplealphacompositing
    const Cs = sourceColor.divide(255);
    const Cb = backdrop.divide(255);

    blendingResult = blendFunctions[blendMode](Cb, Cs).multiply(255);
  }

  // foreground is the "source" color and background is the "backdrop" color
  const r = simpleAlphaCompositing(
    sourceColor.red,
    sourceColor.alpha,
    backdrop.red,
    backdrop.alpha,
    blendMode,
    blendingResult?.red
  );
  const g = simpleAlphaCompositing(
    sourceColor.green,
    sourceColor.alpha,
    backdrop.green,
    backdrop.alpha,
    blendMode,
    blendingResult?.green
  );
  const b = simpleAlphaCompositing(
    sourceColor.blue,
    sourceColor.alpha,
    backdrop.blue,
    backdrop.alpha,
    blendMode,
    blendingResult?.blue
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
  const Cred = Math.round(r / αo);
  const Cgreen = Math.round(g / αo);
  const Cblue = Math.round(b / αo);

  return new Color(Cred, Cgreen, Cblue, αo);
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
function simpleAlphaCompositing(Cs, αs, Cb, αb, blendMode, blendingResult) {
  return (
    αs * (1 - αb) * Cs +
    αs *
      αb *
      (blendingResult ??
        // Note: Cs and Cb values need to be between 0 and 1 inclusive for the blend function
        // @see https://www.w3.org/TR/compositing-1/#simplealphacompositing
        blendFunctions[blendMode](Cb / 255, Cs / 255) * 255) +
    (1 - αs) * αb * Cb
  );
}

// clamp a value between two numbers (inclusive)
function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

// following functions taken from the spec
// @see https://www.w3.org/TR/compositing-1/#blendingnonseparable
function luminosity(color) {
  return 0.3 * color.red + 0.59 * color.green + 0.11 * color.blue;
}

function clipColor(color) {
  const L = luminosity(color);
  const n = Math.min(color.red, color.green, color.blue);
  const x = Math.max(color.red, color.green, color.blue);

  if (n < 0) {
    return new Color(
      L + ((color.red - L) * L) / (L - n),
      L + ((color.green - L) * L) / (L - n),
      L + ((color.blue - L) * L) / (L - n),
      color.alpha
    );
  }

  if (x > 1) {
    return new Color(
      L + ((color.red - L) * (1 - L)) / (x - L),
      L + ((color.green - L) * (1 - L)) / (x - L),
      L + ((color.blue - L) * (1 - L)) / (x - L),
      color.alpha
    );
  }

  return color;
}

function setLuminosity(color, L) {
  const d = L - luminosity(color);
  return clipColor(color.add(d));
}

function saturation(color) {
  return (
    Math.max(color.red, color.green, color.blue) -
    Math.min(color.red, color.green, color.blue)
  );
}

function setSaturation(color, s) {
  const C = new Color(color.red, color.green, color.blue, color.alpha);
  const colorEntires = Object.entries(C)
    .filter(([prop]) => prop !== 'alpha')
    .map(([name, value]) => {
      return { name, value };
    });

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
