import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';
import isHiddenForEveryone from './is-hidden-for-everyone';
import { ariaHidden, isAreaVisible } from './visibility-functions'

/**
 * Determine if an element is visible to a screen reader
 * @method isVisibleForScreenreader
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @return {Boolean} True if the element is visible to a screen reader
 */
export default function isVisibleForScreenreader(vNode) {
  vNode = vNode instanceof AbstractVirtualNode ? vNode : getNodeFromTree(vNode);
  return isVisibleForScreenreaderVirtual(vNode)
}

/**
 * Check the element and ancestors
 */
function isVisibleForScreenreaderVirtual(vNode, recursed) {
  return vNode.cache.get('isVisibleForScreenreader', () => {
    if (ariaHidden(vNode)) {
      return false;
    }

    if (vNode.actualNode && vNode.props.nodeName === 'area') {
      return isAreaVisible(vNode, isVisibleForScreenreaderVirtual);
    }

    if (isHiddenForEveryone(vNode, false, recursed)) {
      return false;
    }

    if (vNode.parent) {
      return isVisibleForScreenreaderVirtual(vNode.parent, true);
    }

    return true;
  });
}