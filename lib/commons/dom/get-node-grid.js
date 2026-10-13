import createGrid from './create-grid';
import { nodeLookup } from '../../core/utils';

/**
 * Get the grid an element exists in: the subgrid of its scroll container,
 * or for absolute elements the grid of their containing block
 * @param {Node|VirtualNode} node
 * @returns {Grid}
 */
export default function getNodeGrid(node) {
  createGrid(); // Ensure the grid exists
  const { vNode } = nodeLookup(node);
  return vNode._grid;
}
