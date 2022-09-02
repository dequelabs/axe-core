import { getRectStack } from './get-rect-stack';
import { getNodeFromTree } from '../../core/utils';
import createGrid from './create-grid';

/**
 * Return all elements that are at the center bounding rect of the passed in node.
 * @method getElementStack
 * @memberof axe.commons.dom
 * @param {Node} node
 * @return {Node[]}
 */
function getElementStack(node) {
  createGrid();

  const vNode = getNodeFromTree(node);
  const grid = vNode._grid;

  if (!grid) {
    return [];
  }

  return getRectStack(grid, vNode.boundingClientRect);
}

export default getElementStack;
