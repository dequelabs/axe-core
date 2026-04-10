import getNodeGrid from './get-node-grid';
import isFixedPosition from './is-fixed-position';

export default function findNearbyElms(vNode, margin = 0) {
  const grid = getNodeGrid(vNode);
  if (!grid?.cells?.length) {
    return []; // Elements not in the grid don't have ._grid
  }
  const rect = vNode.boundingClientRect;
  const selfIsFixed = isFixedPosition(vNode);
  const gridPosition = grid.getGridPositionOfRect(rect, margin);

  const neighbors = [];
  grid.loopGridPosition(gridPosition, vNeighbors => {
    for (const vNeighbor of vNeighbors) {
      if (
        vNeighbor &&
        vNeighbor !== vNode &&
        !neighbors.includes(vNeighbor) &&
        selfIsFixed === isFixedPosition(vNeighbor)
      ) {
        neighbors.push(vNeighbor);
      }
    }
  });

  return neighbors;
}
