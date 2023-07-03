import Color from './color';
import assert from '../../core/utils/assert';

/** Magic numbers **/
// Alpha value to use when text shadows are offset between .5px and 1.5px
const SHADOW_STROKE_ALPHA = 0.54;
// Shadows offset by less than this are not visible enough no matter how much you stack them
const VISIBLE_SHADOW_MIN_PX = 0.5;
// Shadows offset by more than this have full opacity
const OPAQUE_STROKE_OFFSET_MIN_PX = 1.5;

/**
 * Get text-shadow colors that can impact the color contrast of the text
 * @param {Element} node  DOM Element
 * @param {Object} options (optional)
 * @property {Bool} minRatio Ignore shadows smaller than this, ratio shadow size divided by font size
 * @property {Bool} maxRatio Ignore shadows equal or larger than this, ratio shadow size divided by font size
 */
export default function getTextShadowColors(node, { minRatio, maxRatio } = {}) {
  const shadowColors = [];
  const style = window.getComputedStyle(node);
  const textShadow = style.getPropertyValue('text-shadow');
  if (textShadow === 'none') {
    return shadowColors;
  }

  const fontSizeStr = style.getPropertyValue('font-size');
  const fontSize = parseInt(fontSizeStr);
  assert(
    isNaN(fontSize) === false,
    `Unable to determine font-size value ${fontSizeStr}`
  );

  const thinShadows = [];
  const shadows = parseTextShadows(textShadow);
  for (const shadow of shadows) {
    // Defaults only necessary for IE
    const colorStr = shadow.colorStr || style.getPropertyValue('color');
    const [offsetX, offsetY, blurRadius = 0] = shadow.pixels;
    if (maxRatio && blurRadius >= fontSize * maxRatio) {
      continue;
    }
    if (minRatio && blurRadius < fontSize * minRatio) {
      thinShadows.push({ colorStr, pixels: shadow.pixels });
      continue;
    }
    if (thinShadows.length > 0) {
      // Inset any stroke colors before this shadow
      const strokeColors = getStrokeColor(thinShadows);
      shadowColors.push(...strokeColors);
      thinShadows.splice(0, thinShadows.length); // empty
    }

    const color = textShadowColor({
      colorStr,
      offsetX,
      offsetY,
      blurRadius,
      fontSize
    });
    shadowColors.push(color);
  }

  if (thinShadows.length > 0) {
    // Append any remaining stroke colors
    const strokeColors = getStrokeColor(thinShadows);
    shadowColors.push(...strokeColors);
  }

  return shadowColors;
}

function getStrokeColor(thinShadows) {
  const edges = ['top', 'right', 'bottom', 'left'];
  const colorMap = {};
  for (const { colorStr, pixels } of thinShadows) {
    colorMap[colorStr] ??= { top: [], right: [], bottom: [], left: [] };
    const borders = colorMap[colorStr];
    const [offsetX, offsetY] = pixels;

    if (offsetX > VISIBLE_SHADOW_MIN_PX) {
      borders.right.push(pixels);
    } else if (offsetX < -VISIBLE_SHADOW_MIN_PX) {
      borders.left.push(pixels);
    }
    if (offsetY > VISIBLE_SHADOW_MIN_PX) {
      borders.bottom.push(pixels);
    } else if (offsetY < -VISIBLE_SHADOW_MIN_PX) {
      borders.top.push(pixels);
    }
  }

  const strokeShadows = Object.entries(colorMap).filter(([, sides]) => {
    const sidesCovered = edges.filter(side => sides[side].length !== 0).length;
    return sidesCovered >= 3;
  });

  const strokeColors = strokeShadows.map(([colorStr, sides]) => {
    const strokeColor = new Color();
    strokeColor.parseString(colorStr);

    // Average the number of shadows around the text
    let density = 0;
    let isSolid = true;
    edges.forEach(edge => {
      density += sides[edge].length / 4;
      isSolid &&= sides[edge].every(
        ([x, y]) =>
          Math.abs(x) > OPAQUE_STROKE_OFFSET_MIN_PX ||
          Math.abs(y) > OPAQUE_STROKE_OFFSET_MIN_PX
      );
    });

    if (!isSolid) {
      // As more shadows surround the text, the opacity increases
      strokeColor.alpha = 1 - Math.pow(SHADOW_STROKE_ALPHA, density);
    }
    return strokeColor;
  });

  return strokeColors;
}

/**
 * Parse text-shadow property value. Required for IE, which can return the color
 * either at the start or the end, and either in rgb(a) or as a named color
 */
function parseTextShadows(textShadow) {
  let current = { pixels: [] };
  let str = textShadow.trim();
  const shadows = [current];
  if (!str) {
    return [];
  }

  while (str) {
    const colorMatch =
      str.match(/^rgba?\([0-9,.\s]+\)/i) ||
      str.match(/^[a-z]+/i) ||
      str.match(/^#[0-9a-f]+/i);
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
      throw new Error(`Unable to process text-shadows: ${textShadow}`);
    }
  }

  return shadows;
}

function textShadowColor({ colorStr, offsetX, offsetY, blurRadius, fontSize }) {
  if (offsetX > blurRadius || offsetY > blurRadius) {
    // Shadow is too far removed from the text to impact contrast
    return new Color(0, 0, 0, 0);
  }

  const shadowColor = new Color();
  shadowColor.parseString(colorStr);
  shadowColor.alpha *= blurRadiusToAlpha(blurRadius, fontSize);

  return shadowColor;
}

function blurRadiusToAlpha(blurRadius, fontSize) {
  if (blurRadius === 0) {
    return 1;
  }

  // This formula is an estimate based on various tests.
  // Different people test this differently, so opinions may vary.
  const relativeBlur = blurRadius / fontSize;
  return 0.185 / (relativeBlur + 0.4);
}
