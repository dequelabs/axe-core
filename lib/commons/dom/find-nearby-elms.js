import createGrid from './create-grid';
import { memoize } from '../../core/utils';

export default function findNearbyElms(vNode, margin = 0) {
  createGrid(); // Ensure grid exists
  if (!vNode._grid?.cells?.length) {
    return []; // Elements not in the grid don't have ._grid
  }
  const rect = vNode.boundingClientRect;
  const grid = vNode._grid;
  const selfIsFixed = hasFixedPosition(vNode);
  const gridPosition = grid.getGridPositionOfRect(rect, margin);

  const neighbors = [];
  grid.loopGridPosition(gridPosition, vNeighbors => {
    for (const vNeighbor of vNeighbors) {
      if (
        vNeighbor &&
        vNeighbor !== vNode &&
        !neighbors.includes(vNeighbor) &&
        selfIsFixed === hasFixedPosition(vNeighbor)
      ) {
        neighbors.push(vNeighbor);
      }
    }
  });

  return neighbors;
}

const hasFixedPosition = memoize(vNode => {
  if (!vNode) {
    return false;
  }
  if (vNode.getComputedStylePropertyValue('position') === 'fixed') {
    return true;
  }
  return hasFixedPosition(vNode.parent);
});
