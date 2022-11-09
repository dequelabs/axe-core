import createGrid, {
  getGridPositionOfRect,
  loopGridPosition
} from './create-grid';
import { memoize } from '../../core/utils';

export default function findNearbyElms(vNode, margin = 0) {
  createGrid(); // Ensure grid exists
  if (!vNode._grid?.cells?.length) {
    return []; // Elements not in the grid don't have ._grid
  }
  const rect = vNode.boundingClientRect;
  const selfIsFixed = hasFixedPosition(vNode);
  const gridPosition = getGridPositionOfRect(rect, margin);

  const neighbors = [];
  loopGridPosition(vNode._grid, gridPosition, vNeighbor => {
    if (
      vNeighbor &&
      vNeighbor !== vNode &&
      !neighbors.includes(vNeighbor) &&
      selfIsFixed === hasFixedPosition(vNeighbor)
    ) {
      neighbors.push(vNeighbor);
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
