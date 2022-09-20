/**
 * Get the offset between node A and node B
 * @method getOffset
 * @memberof axe.commons.math
 * @param {VirtualNode} vNodeA
 * @param {VirtualNode} vNodeB
 * @returns {number}
 */
export default function getOffset(vNodeA, vNodeB) {
  const rectA = vNodeA.boundingClientRect;
  const rectB = vNodeB.boundingClientRect;
  const pointA = getFarthestPoint(rectA, rectB);
  const pointB = getClosestPoint(pointA, rectA, rectB);
  return pointDistance(pointA, pointB);
}

/**
 * Get a point on rectA that is farthest away from rectB
 * @param {Rect} rectA
 * @param {Rect} rectB
 * @returns {Point}
 */
function getFarthestPoint(rectA, rectB) {
  const dimensionProps = [
    ['x', 'left', 'right', 'width'],
    ['y', 'top', 'bottom', 'height']
  ];
  const farthestPoint = {};
  dimensionProps.forEach(([axis, start, end, diameter]) => {
    if (rectB[start] < rectA[start] && rectB[end] > rectA[end]) {
      farthestPoint[axis] = rectA[start] + rectA[diameter] / 2; // center | middle
      return;
    }
    // Work out which edge of A is farthest away from the center of B
    const centerB = rectB[start] + rectB[diameter] / 2;
    const startDistance = Math.abs(centerB - rectA[start]);
    const endDistance = Math.abs(centerB - rectA[end]);
    if (startDistance >= endDistance) {
      farthestPoint[axis] = rectA[start]; // left | top
    } else {
      farthestPoint[axis] = rectA[end]; // right | bottom
    }
  });
  return farthestPoint;
}

/**
 * Get a point on the adjacentRect, that is as close the point given from ownRect
 * @param {Point} ownRectPoint
 * @param {Rect} ownRect
 * @param {Rect} adjacentRect
 * @returns {Point}
 */
function getClosestPoint({ x, y }, ownRect, adjacentRect) {
  if (pointInRect({ x, y }, adjacentRect)) {
    // Check if there is an opposite corner inside the adjacent rectangle
    const closestPoint = getCornerInAdjacentRect(
      { x, y },
      ownRect,
      adjacentRect
    );
    if (closestPoint !== null) {
      return closestPoint;
    }
    adjacentRect = ownRect;
  }

  const { top, right, bottom, left } = adjacentRect;
  // Is the adjacent rect horizontally or vertically aligned
  const xAligned = x >= left && x <= right;
  const yAligned = y >= top && y <= bottom;
  // Find the closest edge of the adjacent rect
  const closestX = Math.abs(left - x) < Math.abs(right - x) ? left : right;
  const closestY = Math.abs(top - y) < Math.abs(bottom - y) ? top : bottom;

  if (!xAligned && yAligned) {
    return { x: closestX, y }; // Closest horizontal point
  } else if (xAligned && !yAligned) {
    return { x, y: closestY }; // Closest vertical point
  } else if (!xAligned && !yAligned) {
    return { x: closestX, y: closestY }; // Closest diagonal corner
  }
  // ownRect (partially) obscures adjacentRect
  if (Math.abs(x - closestX) < Math.abs(y - closestY)) {
    return { x: closestX, y }; // Inside, closest edge is horizontal
  } else {
    return { x, y: closestY }; // Inside, closest edge is vertical
  }
}

/**
 * Distance between two points
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
function pointDistance(pointA, pointB) {
  const xDistance = Math.abs(pointA.x - pointB.x);
  const yDistance = Math.abs(pointA.y - pointB.y);
  if (!xDistance || !yDistance) {
    return xDistance || yDistance; // If either is 0, return the other
  }
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

/**
 * Return if a point is within a rect
 * @param {Point} point
 * @param {Rect} rect
 * @returns {boolean}
 */
function pointInRect({ x, y }, rect) {
  return y >= rect.top && x <= rect.right && y <= rect.bottom && x >= rect.left;
}

/**
 *
 * @param {Point} ownRectPoint
 * @param {Rect} ownRect
 * @param {Rect} adjacentRect
 * @returns {Point | null} With x and y
 */
function getCornerInAdjacentRect({ x, y }, ownRect, adjacentRect) {
  let closestX, closestY;
  // Find the opposite corner, if it is inside the adjacent rect;
  if (x === ownRect.left && ownRect.right < adjacentRect.right) {
    closestX = ownRect.right;
  } else if (x === ownRect.right && ownRect.left > adjacentRect.left) {
    closestX = ownRect.left;
  }
  if (y === ownRect.top && ownRect.bottom < adjacentRect.bottom) {
    closestY = ownRect.bottom;
  } else if (y === ownRect.bottom && ownRect.top > adjacentRect.top) {
    closestY = ownRect.top;
  }

  if (!closestX && !closestY) {
    return null; // opposite corners are outside the rect, or {x,y} was a center point
  } else if (!closestY) {
    return { x: closestX, y };
  } else if (!closestX) {
    return { x, y: closestY };
  }
  if (Math.abs(x - closestX) < Math.abs(y - closestY)) {
    return { x: closestX, y };
  } else {
    return { x, y: closestY };
  }
}
