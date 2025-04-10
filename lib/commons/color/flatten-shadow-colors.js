import Color from './color';

/**
 * Combine the two given shadow colors according to alpha blending.
 * @deprecated Use axe.commons.color.flattenColors instead
 * @method flattenColors
 * @memberof axe.commons.color.Color
 * @instance
 * @param {Color} fgColor Foreground color
 * @param {Color} bgColor Background color
 * @return {Color} Blended color
 */
export default function flattenShadowColors(fgColor, bgColor) {
  const alpha = fgColor.alpha;
  const r = (1 - alpha) * bgColor.red + alpha * fgColor.red;
  const g = (1 - alpha) * bgColor.green + alpha * fgColor.green;
  const b = (1 - alpha) * bgColor.blue + alpha * fgColor.blue;
  const a = fgColor.alpha + bgColor.alpha * (1 - fgColor.alpha);

  return new Color(r, g, b, a);
}
