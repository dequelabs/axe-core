import Color from './color';

/** Magic numbers **/
// Alpha value to use when text shadows are offset between .5px and 1.5px
const SHADOW_STROKE_ALPHA = 0.54;
// Shadows offset by less than this are not visible enough no matter how much you stack them
const VISIBLE_SHADOW_MIN_PX = 0.5;
// Shadows offset by more than this have full opacity
const OPAQUE_STROKE_OFFSET_MIN_PX = 1.5;

const edges = ['top', 'right', 'bottom', 'left'];

/**
 *
 * @param {Array[]} testShadows Parsed test shadows (see color.parseTestShadow())
 * @returns {Array[]} Array of colors
 */
export default function getStrokeColorsFromShadows(parsedShadows) {
  const colorMap = getShadowColorsMap(parsedShadows);

  // Remove any shadows that cover 1 or 2 sides only
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
      // Decimal values are ignored. a .6px shadow is treated as 1px
      // because it is not rendered evenly around the text.
      // I.e. .6 ends up as 70% alpha on one side and 16% on the other.
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

function getShadowColorsMap(parsedShadows) {
  const colorMap = {};
  for (const { colorStr, pixels } of parsedShadows) {
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
  return colorMap;
}
