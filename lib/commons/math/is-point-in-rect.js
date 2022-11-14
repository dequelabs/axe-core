/**
 * Check if the DOMPoint is within the DOMRect
 * @method isPointInRect
 * @memberof axe.commons.math
 * @param {DOMPoint}
 * @param {DOMRect}
 * @returns {boolean}
 */
export function isPointInRect({ x, y }, { top, right, bottom, left }) {
  return y >= top && x <= right && y <= bottom && x >= left;
}
