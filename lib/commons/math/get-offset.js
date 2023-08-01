import { getTargetSize } from '../dom';

/**
 * Get the offset between node A and node B
 * @method getOffset
 * @memberof axe.commons.math
 * @param {VirtualNode} vNodeA
 * @param {VirtualNode} vNodeB
 * @param {Number} radius
 * @returns {number}
 */
export default function getOffset(vNodeA, vNodeB, radius = 12) {
  const { rect: rectA } = getTargetSize(vNodeA);
  const { rect: rectB } = getTargetSize(vNodeB);

  // one of the rects is fully obscured
  if (rectA === null || rectB === null) {
    return 0;
  }

  const centerA = {
    x: rectA.x + rectA.width / 2,
    y: rectA.y + rectA.height / 2
  };
  const centerB = {
    x: rectB.x + rectB.width / 2,
    y: rectB.y + rectB.height / 2
  };
  const sideB = getClosestPoint(centerA, rectB);

  return Math.min(
    // subtract the radius of the circle from the distance
    pointDistance(centerA, centerB) - radius,
    pointDistance(centerA, sideB)
  );
}

function getClosestPoint(point, rect) {
  let x;
  let y;

  if (point.x < rect.left) {
    x = rect.left;
  }
  else if (point.x > rect.right) {
    x = rect.right;
  }
  else {
    x = point.x;
  }

  if (point.y < rect.top) {
    y = rect.top;
  }
  else if (point.y > rect.bottom) {
    y = rect.bottom;
  }
  else {
    y = point.y;
  }

  return { x, y };
}

/**
 * Distance between two points
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
function pointDistance(pointA, pointB) {
  return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
}