import { findNearbyElms } from '../../commons/dom';
import { getRole, getRoleType } from '../../commons/aria';
import { splitRects, hasVisualOverlap } from '../../commons/math';

/**
 * Determine if an element has a minimum size, taking into account
 * any elements that may obscure it.
 */
export default function targetSize(node, { minSpacing = 23.95 }, vNode) {
  const hasMinimumSize = rect => {
    return rect.width >= minSpacing && rect.height >= minSpacing;
  }

  const rect = vNode.boundingClientRect;
  if (!hasMinimumSize(rect)) {
    return false;
  }
  // Handle overlapping elements;
  const nearbyElms = findNearbyElms(vNode);
  const obscuringElms = nearbyElms.filter(vNeighbor => {
    const role = getRole(vNeighbor)
    return (
      getRoleType(role) === 'widget' &&
      hasVisualOverlap(vNode, vNeighbor)
    );
  });

  if (obscuringElms.length === 0) {
    return true; // No obscuring elements; pass
  }

  const obscuringRects = obscuringElms.map(
    ({ boundingClientRect }) => boundingClientRect
  );
  const unobscuredRects = splitRects(rect, obscuringRects);
  if (unobscuredRects.some(hasMinimumSize)) {
    return true; // Obscuring elements leave enough space; pass
  }

  const smallestRect = unobscuredRects.reduce((rectA, rectB) => {
      return rectA.width * rectA.height > rectB.width * rectB.height
  });
  this.data({ smallestRect });
  this.relatedNodes(obscuringElms.map(({ actualNode }) => actualNode));
  return false;
}

