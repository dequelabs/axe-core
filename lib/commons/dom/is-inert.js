import memoize from '../../core/utils/memoize';

/**
 * Determines if an element is inside an inert subtree.
 * @param {VirtualNode} vNode
 * @param {Boolean} [options.skipAncestors] If the ancestor tree should not be used
 * @return {Boolean} The element's inert state
 */
export default function isInert(vNode, { skipAncestors } = {}) {
  if (skipAncestors) {
    return isInertSelf(vNode);
  }

  return isInertAncestors(vNode);
}

/**
 * Check the element for inert
 */
const isInertSelf = memoize(function isInertSelfMemoized(vNode) {
  return vNode.hasAttr('inert');
});

/**
 * Check the element and ancestors for inert
 */
const isInertAncestors = memoize(function isInertAncestorsMemoized(vNode) {
  if (isInertSelf(vNode)) {
    return true;
  }

  if (!vNode.parent) {
    return false;
  }

  return isInertAncestors(vNode.parent);
});
