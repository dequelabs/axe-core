import getTargetRects from './get-target-rects';
import memoize from '../../core/utils/memoize';

const roundingMargin = 0.05;

export default memoize(getTargetSize);

/**
 * Compute the target size of an element.
 * @see https://www.w3.org/TR/WCAG22/#dfn-targets
 */
function getTargetSize(vNode, minSize) {
  const rects = getTargetRects(vNode);
  return getLargestRect(rects, minSize);
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
