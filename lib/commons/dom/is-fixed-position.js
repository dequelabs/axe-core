import memoize from '../../core/utils/memoize';
import { nodeLookup } from '../../core/utils';

/**
 * Determines if an element is inside a position:fixed subtree, even if the element itself is positioned differently.
 * @param {VirtualNode|Element} node
 * @param {Boolean} [options.skipAncestors] If the ancestor tree should not be used
 * @return {Boolean} The element's position state
 */
export default function isFixedPosition(node, { skipAncestors } = {}) {
  const { vNode } = nodeLookup(node);
  if (skipAncestors) {
    return isFixedSelf(vNode);
  }

  return isFixedAncestors(vNode);
}

/**
 * Check the element for position:fixed
 */
const isFixedSelf = memoize(function isFixedSelfMemoized(vNode) {
  return vNode.getComputedStylePropertyValue('position') === 'fixed';
});

/**
 * Check the element and ancestors for position:fixed
 */
const isFixedAncestors = memoize(function isFixedAncestorsMemoized(vNode) {
  if (isFixedSelf(vNode)) {
    return true;
  }

  if (!vNode.parent) {
    return false;
  }

  return isFixedAncestors(vNode.parent);
});
