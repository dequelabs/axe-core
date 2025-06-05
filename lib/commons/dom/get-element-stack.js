import { getRectStack } from './get-rect-stack';
import { getNodeFromTree } from '../../core/utils';
import getElmGrid from './get-node-grid';

/**
 * Return all elements that are at the center bounding rect of the passed in node.
 * @method getElementStack
 * @memberof axe.commons.dom
 * @param {Node} node
 * @return {Node[]}
 */
function getElementStack(node) {
  const vNode = getNodeFromTree(node);
  const grid = getElmGrid(node);
  if (!grid) {
    return [];
  }

  return getRectStack(grid, vNode.boundingClientRect);
}

export default getElementStack;
