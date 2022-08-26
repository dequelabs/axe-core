import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';
import {
  nativelyHidden,
  displayHidden,
  visibilityHidden
} from './visibility-functions'

/**
 * Determine whether an element is visible
 * @method isHiddenForEveryone
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @param {Boolean} recursed
 * @return {Boolean} The element's visibility state
 */
function isHiddenForEveryone(vNode, recursed) {
  vNode = vNode instanceof AbstractVirtualNode ? vNode : getNodeFromTree(vNode);
  return vNode.cache.get('isHiddenForEveryone', () => isHidden(vNode, recursed))
}

function isHidden(vNode, recursed) {
  if (nativelyHidden(vNode)) {
    return true;
  }

  if (vNode.actualNode) {
    const hiddenMethods = [
      displayHidden,
      visibilityHidden,
      // TODO: areaHidden
    ];

    if (hiddenMethods.some(method => method(vNode, recursed))) {
      return true;
    }
  }

  if (vNode.parent) {
    return isHiddenForEveryone(vNode.parent, true);
  }

  return false;
}