import { getRectStack } from './get-rect-stack';
import { getNodeFromTree } from '../../core/utils';
import getNodeGrid from './get-node-grid';

/**
 * Return all elements that are at the center bounding rect of the passed in node.
 * @method getElementStack
 * @memberof axe.commons.dom
 * @param {Node} node
 * @return {Node[]}
 */
function getElementStack(node) {
  const grid = getNodeGrid(node);
  if (!grid) {
    return [];
  }
  const rect = getNodeFromTree(node).boundingClientRect;
  return getRectStack(grid, rect);
}

export default getElementStack;
