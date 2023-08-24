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
 * Work out which color(s) of an array of text shadows form a stroke around the text.
 * @param {Array[]} testShadows Parsed test shadows (see color.parseTestShadow())
 * @param {Object} options (optional)
 * @property {Bool} ignoreEdgeCount Do not return null when if shadows cover 2 or 3 edges, ignore those instead
 * @returns {Array|null} Array of colors or null if text-shadow was too complex to measure
 */
export default function getStrokeColorsFromShadows(
  parsedShadows,
  { ignoreEdgeCount = false } = {}
) {
  const shadowMap = getShadowColorsMap(parsedShadows);
  const shadowsByColor = Object.entries(shadowMap).map(([colorStr, sides]) => {
    const edgeCount = edges.filter(side => sides[side].length !== 0).length;
    return { colorStr, sides, edgeCount };
  });

  // Bail immediately if any shadow group covers too much of the text to be ignored, but not enough to be tested
  if (
    !ignoreEdgeCount &&
    shadowsByColor.some(({ edgeCount }) => edgeCount > 1 && edgeCount < 4)
  ) {
    return null;
  }

  return shadowsByColor
    .map(shadowGroupToColor)
    .filter(shadow => shadow !== null);
}

/**
 * Create a map of colors to the sides they are on
 */
function getShadowColorsMap(parsedShadows) {
  const colorMap = {};
  for (const { colorStr, pixels } of parsedShadows) {
    colorMap[colorStr] ??= { top: [], right: [], bottom: [], left: [] };
    const borders = colorMap[colorStr];
    const [offsetX, offsetY] = pixels;

    if (offsetX > VISIBLE_SHADOW_MIN_PX) {
      borders.right.push(offsetX);
    } else if (-offsetX > VISIBLE_SHADOW_MIN_PX) {
      borders.left.push(-offsetX);
    }
    if (offsetY > VISIBLE_SHADOW_MIN_PX) {
      borders.bottom.push(offsetY);
    } else if (-offsetY > VISIBLE_SHADOW_MIN_PX) {
      borders.top.push(-offsetY);
    }
  }
  return colorMap;
}

/**
 * Using colorStr and thickness of sides, create a color object
 */
function shadowGroupToColor({ colorStr, sides, edgeCount }) {
  if (edgeCount !== 4) {
    return null; // ignore thin shadows and shadows on one side of the text
  }
  const strokeColor = new Color();
  strokeColor.parseString(colorStr);

  // Detect whether any sides' shadows are thin enough to be considered
  // translucent, and if so, calculate an alpha value to apply on top of
  // the parsed color.
  let density = 0;
  let isSolid = true;
  edges.forEach(edge => {
    // Decimal values are ignored. a .6px shadow is treated as 1px
    // because it is not rendered evenly around the text.
    // I.e. .6 ends up as 70% alpha on one side and 16% on the other.
    density += sides[edge].length / 4;
    isSolid &&= sides[edge].every(
      offset => offset > OPAQUE_STROKE_OFFSET_MIN_PX
    );
  });

  if (!isSolid) {
    // As more shadows surround the text, the opacity increases
    strokeColor.alpha = 1 - Math.pow(SHADOW_STROKE_ALPHA, density);
  }
  return strokeColor;
}
