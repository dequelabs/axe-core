/**
 * Determine if two rectangles touch.
 * @method rectsTouch
 * @memberof axe.commons.math
 * @param {Rect} rect1
 * @param {Rect} rect2
 * @returns {Boolean}
 */
export default function rectsTouch(rect1, rect2) {
  // perform an AABB (axis-aligned bounding box) check.
  // account for differences in how browsers handle floating
  // point precision of bounding rects
  // @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

  /* eslint-disable no-bitwise */
  return (
    (rect1.left | 0) < ((rect2.left + rect2.width) | 0) &&
    ((rect1.left + rect1.width) | 0) > (rect2.left | 0) &&
    (rect1.top | 0) < ((rect2.top + rect2.height) | 0) &&
    ((rect1.height + rect1.top) | 0) > (rect2.top | 0)
  );
  /* eslint-enable no-bitwise */
}
