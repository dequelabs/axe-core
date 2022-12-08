import { getRectStack } from './get-rect-stack';
import createGrid from './create-grid';
import { getNodeFromTree } from '../../core/utils';
import getVisibleChildTextRects from './get-visible-child-text-rects';

/**
 * Return all elements that are at the center of each text client rect of the passed in node.
 * @method getTextElementStack
 * @memberof axe.commons.dom
 * @param {Node} node
 * @return {Array<Node[]>}
 */
function getTextElementStack(node) {
  createGrid();

  const vNode = getNodeFromTree(node);
  const grid = vNode._grid;

  if (!grid) {
    return [];
  }

  const clientRects = getVisibleChildTextRects(node);
  return clientRects.map(rect => getRectStack(grid, rect));
}

export default getTextElementStack;
