import assert from '../../core/utils/assert';

/**
 * Parse text-shadow property value. Required for IE, which can return the color
 * either at the start or the end, and either in rgb(a) or as a named color
 * @param {String} textShadow
 * @returns {Array} Array of objects with `pixels` and `colorStr` properties
 */
export default function parseTextShadows(textShadow) {
  let current = { pixels: [] };
  let str = textShadow.trim();
  const shadows = [current];
  if (!str) {
    return [];
  }

  while (str) {
    const colorMatch =
      // match a color name or function (e.g. `oklch(39.2% 0.4 0 / 0.5)`) or a hex value
      str.match(/^[a-z]+(\([^)]+\))?/i) || str.match(/^#[0-9a-f]+/i);
    const pixelMatch = str.match(/^([0-9.-]+)px/i) || str.match(/^(0)/);

    if (colorMatch) {
      assert(
        !current.colorStr,
        `Multiple colors identified in text-shadow: ${textShadow}`
      );
      str = str.replace(colorMatch[0], '').trim();
      current.colorStr = colorMatch[0];
    } else if (pixelMatch) {
      assert(
        current.pixels.length < 3,
        `Too many pixel units in text-shadow: ${textShadow}`
      );
      str = str.replace(pixelMatch[0], '').trim();
      const pixelUnit = parseFloat(
        (pixelMatch[1][0] === '.' ? '0' : '') + pixelMatch[1]
      );
      current.pixels.push(pixelUnit);
    } else if (str[0] === ',') {
      // multiple text-shadows in a single string (e.g. `text-shadow: 1px 1px 1px #000, 3px 3px 5px blue;`
      assert(
        current.pixels.length >= 2,
        `Missing pixel value in text-shadow: ${textShadow}`
      );
      current = { pixels: [] };
      shadows.push(current);
      str = str.substr(1).trim();
    } else {
      throw new Error(`Unable to process text-shadows: ${str}`);
    }
  }

  shadows.forEach(({ pixels }) => {
    if (pixels.length === 2) {
      pixels.push(0); // Append default blur
    }
  });

  return shadows;
}
