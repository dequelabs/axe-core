import findNearbyElms from './find-nearby-elms';
import { splitRects, hasVisualOverlap } from '../math';
import memoize from '../../core/utils/memoize';

export default memoize(getTargetRects);

/**
 * Compute the unobscured
 * @see https://www.w3.org/TR/WCAG22/#dfn-bounding-boxes
 */
function getTargetRects(vNode) {
  const nodeRect = vNode.boundingClientRect;
  const overlappingVNodes = findNearbyElms(vNode).filter(vNeighbor => {
    return (
      vNeighbor.getComputedStylePropertyValue('pointer-events') !== 'none' &&
      hasVisualOverlap(vNode, vNeighbor)
    );
  });

  if (!overlappingVNodes.length) {
    return [nodeRect];
  }

  const obscuringRects = overlappingVNodes.map(
    ({ boundingClientRect: rect }) => rect
  );
  return splitRects(nodeRect, obscuringRects);
}
