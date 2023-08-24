import { nodeLookup } from '../../core/utils';
import memoize from '../../core/utils/memoize';
import isHiddenForEveryone from './is-hidden-for-everyone';
import { ariaHidden, areaHidden } from './visibility-methods';
import isInert from './is-inert';

/**
 * Determine if an element is visible to a screen reader
 * @method isVisibleToScreenReaders
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @return {Boolean} True if the element is visible to a screen reader
 */
export default function isVisibleToScreenReaders(vNode) {
  vNode = nodeLookup(vNode).vNode;
  return isVisibleToScreenReadersVirtual(vNode);
}

/**
 * Check the element and ancestors
 */
const isVisibleToScreenReadersVirtual = memoize(
  function isVisibleToScreenReadersMemoized(vNode, isAncestor) {
    if (
      ariaHidden(vNode) ||
      isInert(vNode, { skipAncestors: true, isAncestor })
    ) {
      return false;
    }

    if (vNode.actualNode && vNode.props.nodeName === 'area') {
      return !areaHidden(vNode, isVisibleToScreenReadersVirtual);
    }

    if (isHiddenForEveryone(vNode, { skipAncestors: true, isAncestor })) {
      return false;
    }

    if (!vNode.parent) {
      return true;
    }

    return isVisibleToScreenReadersVirtual(vNode.parent, true);
  }
);
