import { visuallySort } from '../dom';

/**
 * Check if node A overlaps B
 * @param {VirtualNode} vNodeA 
 * @param {VirtualNode} vNodeB 
 * @returns 0 | 1 | -1
 */
export default function hasVisualOverlap(vNodeA, vNodeB) {
  const overlapRect = getRectOverlap(
    vNodeA.boundingClientRect,
    vNodeB.boundingClientRect
  );
  if (overlapRect === null || overlapRect.width < 1 || overlapRect.height < 1) {
    return false; // No overlap
  }
   // Check B is rendered on top of A
  return visuallySort(vNodeA, vNodeB) > 0
}

// Return the overlapping area of two rects, null if none
function getRectOverlap(rectA, rectB) {
  const baseRect = {
    top: Math.max(rectA.top, rectB.top),
    left: Math.max(rectA.left, rectB.left),
    bottom: Math.min(rectA.bottom, rectB.bottom),
    right: Math.min(rectA.right, rectB.right)
  };
  if (baseRect.top > baseRect.bottom || baseRect.left > baseRect.right) {
    return null; // no overlap
  }

  return computeRect(baseRect);
}

function computeRect(baseRect) {
  return {
    ...baseRect,
    x: baseRect.left,
    y: baseRect.top,
    height: baseRect.bottom - baseRect.top,
    width: baseRect.right - baseRect.left
  };
}
