import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';
import memoize from '../../core/utils/memoize';
import isHiddenForEveryone from './is-hidden-for-everyone';
import { ariaHidden, isAreaVisible } from './visibility-methods';

/**
 * Determine if an element is visible to a screen reader
 * @method isVisibleForScreenreader
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @return {Boolean} True if the element is visible to a screen reader
 */
export default function isVisibleForScreenreader(vNode) {
  vNode = vNode instanceof AbstractVirtualNode ? vNode : getNodeFromTree(vNode);
  return isVisibleForScreenreaderVirtual(vNode, {});
}

/**
 * Check the element and ancestors
 */
const isVisibleForScreenreaderVirtual = memoize(
  function isVisibleForScreenreaderMemoized(vNode, options) {
    // cannot use memoize with a default parameter if we transpile
    // the code. the transpiler removes the parameter from the function
    // signature so the function is only memoized with the one
    // parameter
    options = options ?? {};
    const isAncestor = options.isAncestor;

    if (ariaHidden(vNode)) {
      return false;
    }

    if (vNode.actualNode && vNode.props.nodeName === 'area') {
      return isAreaVisible(vNode, isVisibleForScreenreaderVirtual);
    }

    if (isHiddenForEveryone(vNode, { skipAncestors: true, isAncestor })) {
      return false;
    }

    if (!vNode.parent) {
      return true;
    }

    return isVisibleForScreenreaderVirtual(vNode.parent, { isAncestor: true });
  }
);
