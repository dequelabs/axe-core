import { findNearbyElms } from '../../commons/dom';
import { getRole, getRoleType } from '../../commons/aria';
import { splitRects, hasVisualOverlap } from '../../commons/math';

/**
 * Determine if an element has a minimum size, taking into account
 * any elements that may obscure it.
 */
export default function targetSize(node, { minSpacing = 23.95 }, vNode) {
  const hasMinimumSize = ({ width, height }) => {
    return width >= minSpacing && height >= minSpacing;
  }

  const nodeRect = vNode.boundingClientRect;
  if (!hasMinimumSize(nodeRect)) {
    this.data(toDecimalSize(nodeRect));
    return false;
  }

  // Handle overlapping elements;
  const nearbyElms = findNearbyElms(vNode);
  const obscuringElms = nearbyElms.filter(vNeighbor => {
    const role = getRole(vNeighbor)
    return (getRoleType(role) === 'widget' && hasVisualOverlap(vNode, vNeighbor))
  });

  if (obscuringElms.length === 0) {
    this.data(toDecimalSize(nodeRect));
    return true; // No obscuring elements; pass
  }
  
  // Find areas of the target that are not obscured
  const obscuringRects = obscuringElms.map(({ boundingClientRect: rect }) => rect);
  const unobscuredRects = splitRects(nodeRect, obscuringRects);

  // Of the unobscured inner rects, work out the largest
  const largestInnerRect = unobscuredRects.reduce((rectA, rectB) => {
    const rectAisMinimum = hasMinimumSize(rectA);
    const rectBisMinimum = hasMinimumSize(rectB);
    // Prioritize rects that pass the minimum
    if (rectAisMinimum !== rectBisMinimum) {
      return rectAisMinimum ? rectA : rectB;
    }
    const areaA = rectA.width * rectA.height;
    const areaB = rectB.width * rectB.height;
    return areaA > areaB ? rectA : rectB;
  });

  if (!hasMinimumSize(largestInnerRect)) {
    this.data({
      messageKey: 'obscured',
      ...toDecimalSize(largestInnerRect)
    });
    this.relatedNodes(obscuringElms.map(({ actualNode }) => actualNode));
    // Element is (partially?) obscured, with insufficient space
    return false;
  }
  
  this.data(toDecimalSize(largestInnerRect));
  return true;
}

function toDecimalSize(rect) {
  return {
    width: Math.round(rect.width * 10) / 10,
    height: Math.round(rect.height * 10) / 10
  }
}
