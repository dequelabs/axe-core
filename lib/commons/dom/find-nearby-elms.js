import createGrid from './create-grid';

function findNearbyElms(vNode, margin = 0) {
  /*eslint no-bitwise: 0*/
  const gridSize = createGrid();
  const neighbors = [];
  const rect = vNode.boundingClientRect;
  const gridCells = vNode._grid.cells;

  const topRow = ((rect.top - margin) / gridSize) | 0;
  const bottomRow = ((rect.bottom + margin) / gridSize) | 0;
  const leftCol = ((rect.left - margin) / gridSize) | 0;
  const rightCol = ((rect.right + margin) / gridSize) | 0;

  for (let row = topRow; row <= bottomRow; row++) {
    for (let col = leftCol; col <= rightCol; col++) {
      for (let i = 0; i <= gridCells[row][col].length; i++) {
        var vNeighbour = gridCells[row][col][i];
        // Avoid duplication
        if (
          vNeighbour &&
          vNeighbour !== vNode &&
          !neighbors.includes(vNeighbour)
        ) {
          neighbors.push(vNeighbour);
        }
      }
    }
  }
  return neighbors;
}

export default findNearbyElms;
