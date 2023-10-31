import { nodeLookup } from '../../core/utils';
import memoize from '../../core/utils/memoize';
import {
  nativelyHidden,
  displayHidden,
  visibilityHidden,
  contentVisibiltyHidden,
  detailsHidden
} from './visibility-methods';

const hiddenMethods = [
  displayHidden,
  visibilityHidden,
  contentVisibiltyHidden,
  detailsHidden
];

/**
 * Determine if an element is hidden from screenreaders and visual users
 * @method isHiddenForEveryone
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @param {Object} [options]
 * @param {Boolean} [options.skipAncestors] If the ancestor tree should be not be used
 * @param {Boolean} [options.isAncestor] If this function is being called on an ancestor for the target node
 * @return {Boolean} The element's visibility state
 */
export default function isHiddenForEveryone(
  vNode,
  { skipAncestors, isAncestor = false } = {}
) {
  vNode = nodeLookup(vNode).vNode;

  if (skipAncestors) {
    return isHiddenSelf(vNode, isAncestor);
  }

  return isHiddenAncestors(vNode, isAncestor);
}

/**
 * Check the element for visibility state
 */
const isHiddenSelf = memoize(function isHiddenSelfMemoized(vNode, isAncestor) {
  if (nativelyHidden(vNode)) {
    return true;
  }

  if (!vNode.actualNode) {
    return false;
  }

  if (hiddenMethods.some(method => method(vNode, { isAncestor }))) {
    return true;
  }

  // detached node
  if (!vNode.actualNode.isConnected) {
    return true;
  }

  return false;
});

/**
 * Check the element and ancestors for visibility state
 */
const isHiddenAncestors = memoize(
  function isHiddenAncestorsMemoized(vNode, isAncestor) {
    if (isHiddenSelf(vNode, isAncestor)) {
      return true;
    }

    if (!vNode.parent) {
      return false;
    }

    return isHiddenAncestors(vNode.parent, true);
  }
);
