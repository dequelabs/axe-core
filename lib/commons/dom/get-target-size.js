import findNearbyElms from './find-nearby-elms';
import { splitRects, hasVisualOverlap } from '../math';
import memoize from '../../core/utils/memoize';

const roundingMargin = 0.05;

export default memoize(getTargetSize);

/**
 * Compute the target size of an element.
 * @see https://www.w3.org/TR/WCAG22/#dfn-targets
 */
function getTargetSize(vNode, minSize) {
  const nodeRect = vNode.boundingClientRect;
  const overlappingVNodes = findNearbyElms(vNode).filter(vNeighbor => {
    return (
      vNeighbor.getComputedStylePropertyValue('pointer-events') !== 'none' &&
      hasVisualOverlap(vNode, vNeighbor)
    );
  });

  if (!overlappingVNodes.length) {
    return nodeRect;
  }

  return getLargestUnobscuredArea(vNode, overlappingVNodes, minSize);
}

// Find areas of the target that are not obscured
function getLargestUnobscuredArea(vNode, obscuredNodes, minSize) {
  const nodeRect = vNode.boundingClientRect;
  if (obscuredNodes.length === 0) {
    return null;
  }
  const obscuringRects = obscuredNodes.map(
    ({ boundingClientRect: rect }) => rect
  );
  const unobscuredRects = splitRects(nodeRect, obscuringRects);
  if (!unobscuredRects.length) {
    return null;
  }

  // Of the unobscured inner rects, work out the largest
  return getLargestRect(unobscuredRects, minSize);
}

// Find the largest rectangle in the array, prioritize ones that meet a minimum size
function getLargestRect(rects, minSize) {
  return rects.reduce((rectA, rectB) => {
    const rectAisMinimum = rectHasMinimumSize(minSize, rectA);
    const rectBisMinimum = rectHasMinimumSize(minSize, rectB);
    // Prioritize rects that pass the minimum
    if (rectAisMinimum !== rectBisMinimum) {
      return rectAisMinimum ? rectA : rectB;
    }
    const areaA = rectA.width * rectA.height;
    const areaB = rectB.width * rectB.height;
    return areaA > areaB ? rectA : rectB;
  });
}

function rectHasMinimumSize(minSize, { width, height }) {
  return (
    width + roundingMargin >= minSize && height + roundingMargin >= minSize
  );
}
