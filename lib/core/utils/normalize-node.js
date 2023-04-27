import AbstractVirtualNode from '../base/virtual-node/abstract-virtual-node';
import getNodeFromTree from './get-node-from-tree';

/**
 * Get the virtual node and actual node from a parameter that could be either.
 *
 * @param {Element|VirtualNode} node
 * @return {Object} The Virtual Node and actual node
 */
export default function normalizeNode(node) {
  const vNode =
    node instanceof AbstractVirtualNode ? node : getNodeFromTree(node);
  return { vNode, node: vNode.actualNode };
}
