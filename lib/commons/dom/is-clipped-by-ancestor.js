import findAbsoluteContainingBlock from './find-absolute-containing-block';
import findFixedContainingBlock from './find-fixed-containing-block';
import memoize from '../../core/utils/memoize';

/**
 * Determine if the overflow of an ancestor applies to an element. An absolute
 * or fixed element, and its content, escapes the overflow of every ancestor
 * between it and its containing block.
 * @method isClippedByAncestor
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @param {VirtualNode} vAncestor
 * @return {Boolean}
 */
export default function isClippedByAncestor(vNode, vAncestor) {
  return !getEscapedAncestors(vNode).has(vAncestor);
}

const getEscapedAncestors = memoize(
  function getEscapedAncestorsMemoized(vNode) {
    const position = vNode.getComputedStylePropertyValue('position');
    if (position !== 'absolute' && position !== 'fixed') {
      return vNode.parent ? getEscapedAncestors(vNode.parent) : new Set();
    }

    const containingBlock =
      position === 'fixed'
        ? findFixedContainingBlock(vNode)
        : findAbsoluteContainingBlock(vNode);
    const escapedAncestors = new Set(
      containingBlock ? getEscapedAncestors(containingBlock) : []
    );
    for (
      let vAncestor = vNode.parent;
      vAncestor && vAncestor !== containingBlock;
      vAncestor = vAncestor.parent
    ) {
      escapedAncestors.add(vAncestor);
    }
    return escapedAncestors;
  },
  { primitive: true }
);
