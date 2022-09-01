import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';
import memoize from '../../core/utils/memoize';
import isHiddenForEveryone from './is-hidden-for-everyone';
import {
  opacityHidden,
  scrollClipped,
  overflowHidden,
  clipHidden,
  isAreaVisible
} from './visibility-functions'
import isOffscreen from './is-offscreen';

/**
 * Determine if an element is visible on screen
 * @method isVisibleOnScreen
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @return {Boolean} True if the element is visible on screen
 */
export default function isVisibleOnScreen(vNode) {
  vNode = vNode instanceof AbstractVirtualNode ? vNode : getNodeFromTree(vNode);
  return isVisibleOnScreenVirtual(vNode)
}

const isVisibleOnScreenVirtual = memoize(function (vNode, recursed) {
  if (vNode.actualNode && vNode.props.nodeName === 'area') {
    return isAreaVisible(vNode, isVisibleOnScreenVirtual);
  }

  if (isHiddenForEveryone(vNode, false, recursed)) {
    return false;
  }

  if (vNode.actualNode) {
    const hiddenMethods = [
      opacityHidden,
      scrollClipped,
      overflowHidden,
      clipHidden,
      isOffscreen
    ];

    if (hiddenMethods.some(method => method(vNode, recursed))) {
      return false;
    }
  }

  if (vNode.parent) {
    return isVisibleOnScreenVirtual(vNode.parent, true);
  }

  return true;
});