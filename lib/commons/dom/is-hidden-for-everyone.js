import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';
import memoize from '../../core/utils/memoize';
import {
  nativelyHidden,
  displayHidden,
  visibilityHidden
} from './visibility-functions'

/**
 * Determine if an element is hidden from screenreaders and visual users
 * @method isHiddenForEveryone
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @param {Boolean} [ancestors=true] If the ancestor tree should be used
 * @param {Boolean} recursed
 * @return {Boolean} The element's visibility state
 */
export default function isHiddenForEveryone(vNode, ancestors = true, recursed) {
  vNode = vNode instanceof AbstractVirtualNode ? vNode : getNodeFromTree(vNode);

  return ancestors
    ? isHiddenAncestors(vNode, recursed)
    : isHiddenSelf(vNode, recursed)
}

/**
 * Check the element for visibility state
 */
const isHiddenSelf = memoize(function (vNode, recursed) {
  if (nativelyHidden(vNode)) {
    return true;
  }

  if (vNode.actualNode) {
    const hiddenMethods = [
      displayHidden,
      visibilityHidden
    ];

    if (hiddenMethods.some(method => method(vNode, recursed))) {
      return true;
    }
  }

  return false;
});

/**
 * Check the element and ancestors for visibility state
 */
const isHiddenAncestors = memoize(function (vNode, recursed) {
  if (isHiddenSelf(vNode, recursed)) {
    return true;
  }

  if (vNode.parent) {
    return isHiddenAncestors(vNode.parent, true);
  }

  return false;
});