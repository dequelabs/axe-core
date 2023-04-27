import AbstractVirtualNode from '../base/virtual-node/abstract-virtual-node';
import getNodeFromTree from './get-node-from-tree';

/**
 * Get the virtual node and actual node from a parameter that could be either.
 *
 * @param {VirtualNode|Element} element
 * @return {Object} The Virtual Node and actual node
 */
export default function normalizeNode(element) {
  if (element instanceof AbstractVirtualNode) {
    return {
      vNode: element,
      node: element.actualNode
    };
  }

  return {
    vNode: getNodeFromTree(element),
    node: element
  };
}
