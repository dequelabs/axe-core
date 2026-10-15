import isAbsoluteContainingBlock from './is-absolute-containing-block';
import memoize from '../../core/utils/memoize';

/**
 * Find the containing block of an absolute element: its closest flat tree
 * ancestor that is an absolute containing block.
 * @method findAbsoluteContainingBlock
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @return {VirtualNode|null} null when the containing block is the initial containing block
 */
const findAbsoluteContainingBlock = memoize(
  function findAbsoluteContainingBlockMemoized(vNode) {
    let vAncestor = vNode.parent;
    while (vAncestor && !isAbsoluteContainingBlock(vAncestor)) {
      vAncestor = vAncestor.parent;
    }
    return vAncestor ?? null;
  },
  { primitive: true }
);

export default findAbsoluteContainingBlock;
