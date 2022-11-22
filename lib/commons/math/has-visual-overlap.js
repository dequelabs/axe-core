import { visuallySort } from '../dom';

/**
 * Check if node A overlaps B
 * @method getOffset
 * @memberof axe.commons.math
 * @param {VirtualNode} vNodeA
 * @param {VirtualNode} vNodeB
 * @returns {boolean}
 */
export default function hasVisualOverlap(vNodeA, vNodeB) {
  const rectA = vNodeA.boundingClientRect;
  const rectB = vNodeB.boundingClientRect;
  if (
    rectA.left >= rectB.right ||
    rectA.right <= rectB.left ||
    rectA.top >= rectB.bottom ||
    rectA.bottom <= rectB.top
  ) {
    return false;
  }
  return visuallySort(vNodeA, vNodeB) > 0;
}
