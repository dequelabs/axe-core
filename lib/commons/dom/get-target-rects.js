import findNearbyElms from './find-nearby-elms';
import isInTabOrder from './is-in-tab-order';
import { splitRects, hasVisualOverlap } from '../math';
import memoize from '../../core/utils/memoize';
import { contains } from '../../core/utils';

export default memoize(getTargetRects);

/**
 * Return all unobscured rects of a target.
 * @see https://www.w3.org/TR/WCAG22/#dfn-bounding-boxes
 * @param {VitualNode} vNode
 * @return {DOMRect[]}
 */
function getTargetRects(vNode) {
  const display = vNode.getComputedStylePropertyValue('display');
  const nodeRects =
    display === 'inline' ? vNode.clientRects : [vNode.boundingClientRect];
  const overlappingVNodes = findNearbyElms(vNode).filter(vNeighbor => {
    return (
      hasVisualOverlap(vNode, vNeighbor) &&
      vNeighbor.getComputedStylePropertyValue('pointer-events') !== 'none' &&
      !isDescendantNotInTabOrder(vNode, vNeighbor)
    );
  });

  if (!overlappingVNodes.length) {
    return nodeRects;
  }

  const obscuringRects = overlappingVNodes
    .map(overlappingVNode => {
      const overlappingDisplay =
        overlappingVNode.getComputedStylePropertyValue('display');
      return overlappingDisplay === 'inline'
        ? overlappingVNode.clientRects
        : overlappingVNode.boundingClientRect;
    })
    .flat(Infinity);
  return splitRects(nodeRects, obscuringRects);
}

function isDescendantNotInTabOrder(vAncestor, vNode) {
  return contains(vAncestor, vNode) && !isInTabOrder(vNode);
}
