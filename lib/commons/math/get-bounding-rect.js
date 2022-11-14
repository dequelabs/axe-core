/**
 * Return a new rect that wraps around both rectA and rectB
 * @method getBoundingRect
 * @memberof axe.commons.math
 * @param {DOMRect} rectA
 * @param {DOMRect} rectB
 * @returns {DOMRect}
 */
export function getBoundingRect(rectA, rectB) {
  const top = Math.min(rectA.top, rectB.top);
  const right = Math.max(rectA.right, rectB.right);
  const bottom = Math.max(rectA.bottom, rectB.bottom);
  const left = Math.min(rectA.left, rectB.left);
  return new window.DOMRect(left, top, right - left, bottom - top);
}
