import isFixedContainingBlock from './is-fixed-containing-block';
import memoize from '../../core/utils/memoize';

/**
 * Find the containing block of a fixed element: its closest flat tree
 * ancestor that is a fixed containing block (transform, filter, etc.).
 * @method findFixedContainingBlock
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @return {VirtualNode|null} null when the containing block is the viewport
 */
const findFixedContainingBlock = memoize(
  function findFixedContainingBlockMemoized(vNode) {
    let vAncestor = vNode.parent;
    while (vAncestor && !isFixedContainingBlock(vAncestor)) {
      vAncestor = vAncestor.parent;
    }
    return vAncestor ?? null;
  },
  { primitive: true }
);

export default findFixedContainingBlock;
