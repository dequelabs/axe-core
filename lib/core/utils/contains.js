/**
 * Wrapper for Node#contains
 * @method contains
 * @memberof axe.utils
 * @param  {VirtualNode} vNode     The candidate container VirtualNode
 * @param  {VirtualNode} otherVNode The vNode to test is contained by `vNode`
 * @return {Boolean}           Whether `vNode` contains `otherVNode`
 */
export default function contains(vNode, otherVNode) {
  // Native light DOM method
  if (
    !vNode.shadowId &&
    !otherVNode.shadowId &&
    vNode.actualNode &&
    // eslint-disable-next-line no-restricted-syntax
    typeof vNode.actualNode.contains === 'function'
  ) {
    // eslint-disable-next-line no-restricted-syntax
    return vNode.actualNode.contains(otherVNode.actualNode);
  }

  // Alternative method for shadow DOM / virtual tree tests
  do {
    if (vNode === otherVNode) {
      return true;
    } else if (otherVNode.nodeIndex < vNode.nodeIndex) {
      return false;
    }
    otherVNode = otherVNode.parent;
  } while (otherVNode);

  return false;
}
