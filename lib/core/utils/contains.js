/**
 * Wrapper for Node#contains
 * @method contains
 * @memberof axe.utils
 * @param  {VirtualNode} vNode     The candidate container VirtualNode
 * @param  {VirtualNode} otherVNode The vNode to test is contained by `vNode`
 * @return {Boolean}           Whether `vNode` contains `otherVNode`
 */
export default function contains(vNode, otherVNode) {
  /*eslint no-bitwise: 0*/
  if (vNode.shadowId || otherVNode.shadowId) {
    do {
      if (vNode.shadowId === otherVNode.shadowId) {
        return true;
      }
      otherVNode = otherVNode.parent;
    } while (otherVNode);
    return false;
  }

  if (!vNode.actualNode) {
    // fallback for virtualNode only contexts
    // @see https://github.com/Financial-Times/polyfill-service/pull/183/files
    do {
      if (otherVNode === vNode) {
        return true;
      }
      otherVNode = otherVNode.parent;
    } while (otherVNode);
  }

  if (typeof vNode.actualNode.contains !== 'function') {
    const position = vNode.actualNode.compareDocumentPosition(
      otherVNode.actualNode
    );
    return !!(position & 16);
  }
  return vNode.actualNode.contains(otherVNode.actualNode);
}
