import AbstractVirtualNode from '../base/virtual-node/abstract-virtual-node';
import getNodeFromTree from './get-node-from-tree';

/**
 * Get the virtual node and actual node from a parameter that could be either.
 *
 * @param {VirtualNode|Element} node
 * @return {Object} The Virtual Node and actual node
 */
export default function nodeLookup(node) {
  if (node instanceof AbstractVirtualNode) {
    return {
      vNode: node,
      domNode: node.actualNode
    };
  }

  return {
    vNode: getNodeFromTree(node),
    domNode: node
  };
}
