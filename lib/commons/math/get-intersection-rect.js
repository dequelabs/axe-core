/**
 * Get the intersection rectangle of two rectangles. Returns null if the rectangles do not intersect.
 * @see https://math.stackexchange.com/a/2477358
 * @method getIntersectionRect
 * @memberof axe.commons.math
 * @param {DOMRect} rect1
 * @param {DOMRect} rect2
 * @returns {DOMRect|Null}
 */
export default function getIntersectionRect(rect1, rect2) {
  const leftX = Math.max(rect1.left, rect2.left);
  const rightX = Math.min(rect1.right, rect2.right);
  const topY = Math.max(rect1.top, rect2.top);
  const bottomY = Math.min(rect1.bottom, rect2.bottom);

  if (leftX >= rightX || topY >= bottomY) {
    return null;
  }

  return new window.DOMRect(leftX, topY, rightX - leftX, bottomY - topY);
}
