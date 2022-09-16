import createGrid from './create-grid';

export default function findNearbyElms(vNode, margin = 0) {
  /*eslint no-bitwise: 0*/
  const gridSize = createGrid();
  if (!vNode._grid?.cells?.length) {
    return []; // Elements not in the grid don't have ._grid
  }

  const rect = vNode.boundingClientRect;
  const gridCells = vNode._grid.cells;
  const boundaries = {
    topRow: ((rect.top - margin) / gridSize) | 0,
    bottomRow: ((rect.bottom + margin) / gridSize) | 0,
    leftCol: ((rect.left - margin) / gridSize) | 0,
    rightCol: ((rect.right + margin) / gridSize) | 0
  };

  const neighbors = [];
  loopGridCells(gridCells, boundaries, vNeighbor => {
    if (vNeighbor && vNeighbor !== vNode && !neighbors.includes(vNeighbor)) {
      neighbors.push(vNeighbor);
    }
  });
  return neighbors;
}

function loopGridCells(gridCells, boundaries, cb) {
  const { topRow, bottomRow, leftCol, rightCol } = boundaries;
  for (let row = topRow; row <= bottomRow; row++) {
    for (let col = leftCol; col <= rightCol; col++) {
      // Don't loop on elements outside the grid
      const length = gridCells[row]?.[col]?.length ?? -1;
      for (let i = 0; i <= length; i++) {
        cb(gridCells[row][col][i]);
      }
    }
  }
}
