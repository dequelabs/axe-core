import { createGrid } from './get-rect-stack';
import cache from '../../core/base/cache';

// TODO: This needs to come from a constant,
// rather than have this variable sit in two places in the code
const gridSize = 200;

function findNearbyElms(vNode, margin = 0) {
  // TODO: See if we can't DRY up this createGrid thing.
  if (!cache.get('gridCreated')) {
    createGrid();
    cache.set('gridCreated', true);
  }

  /*eslint no-bitwise: 0*/
  const neighbours = [];
  const rect = vNode.boundingClientRect;
  const gridCells = vNode._grid.cells;

  const topRow = ((rect.top - margin) / gridSize) | 0;
  const bottomRow = ((rect.bottom + margin) / gridSize) | 0;
  const leftCol = ((rect.left - margin) / gridSize) | 0;
  const rightCol = ((rect.right + margin) / gridSize) | 0;

  for (let row = topRow; row <= bottomRow; row++) {
    for (let col = leftCol; col <= rightCol; col++) {
      neighbours.push(...gridCells[row][col]);
    }
  }
  return neighbours.filter(neighbour => vNode !== neighbour);
}

export default findNearbyElms;
