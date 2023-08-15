import findNearbyElms from './find-nearby-elms';
import isInTabOrder from './is-in-tab-order';
import { splitRects, hasVisualOverlap } from '../math';
import memoize from '../../core/utils/memoize';

export default memoize(getTargetRects);

/**
 * Return all unobscured rects of a target.
 * @see https://www.w3.org/TR/WCAG22/#dfn-bounding-boxes
 * @param {VitualNode} vNode
 * @return {DOMRect[]}
 */
function getTargetRects(vNode) {
  const nodeRect = vNode.boundingClientRect;
  const overlappingVNodes = findNearbyElms(vNode).filter(vNeighbor => {
    return (
      hasVisualOverlap(vNode, vNeighbor) &&
      vNeighbor.getComputedStylePropertyValue('pointer-events') !== 'none' &&
      !isDescendantNotInTabOrder(vNode, vNeighbor)
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

function isDescendantNotInTabOrder(vAncestor, vNode) {
  return (
    vAncestor.actualNode.contains(vNode.actualNode) && !isInTabOrder(vNode)
  );
}
