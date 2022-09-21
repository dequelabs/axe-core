/* eslint no-bitwise: 0 */
import visuallySort from './visually-sort';
import constants from '../../core/constants';

export function getRectStack(grid, rect, recursed = false) {
  // use center point of rect
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const floorX = floor(x);
  const floorY = floor(y);

  // NOTE: there is a very rare edge case in Chrome vs Firefox that can
  // return different results of `document.elementsFromPoint`. If the center
  // point of the element is <1px outside of another elements bounding rect,
  // Chrome appears to round the number up and return the element while Firefox
  // keeps the number as is and won't return the element. In this case, we
  // went with pixel perfect collision rather than rounding
  const row = floor(y / constants.gridSize);
  const col = floor(x / constants.gridSize);

  // we're making an assumption that there cannot be an element in the
  // grid which escapes the grid bounds. For example, if the grid is 4x4 there
  // can't be an element whose midpoint is at column 5. If this happens this
  // means there's an error in our grid logic that needs to be fixed
  if (row > grid.cells.length || col > grid.numCols) {
    throw new Error('Element midpoint exceeds the grid bounds');
  }

  // it is acceptable if a row has empty cells due to client rects not filling
  // the entire bounding rect of an element
  // @see https://github.com/dequelabs/axe-core/issues/3166
  let stack =
    grid.cells[row][col]?.filter(gridCellNode => {
      return gridCellNode.clientRects.find(clientRect => {
        const rectX = clientRect.left;
        const rectY = clientRect.top;

        // perform an AABB (axis-aligned bounding box) collision check for the
        // point inside the rect
        // account for differences in how browsers handle floating point
        // precision of bounding rects
        return (
          floorX < floor(rectX + clientRect.width) &&
          floorX >= floor(rectX) &&
          floorY < floor(rectY + clientRect.height) &&
          floorY >= floor(rectY)
        );
      });
    }) ?? [];

  const gridContainer = grid.container;
  if (gridContainer) {
    stack = getRectStack(
      gridContainer._grid,
      gridContainer.boundingClientRect,
      true
    ).concat(stack);
  }

  if (!recursed) {
    stack = stack
      .sort(visuallySort)
      .map(vNode => vNode.actualNode)
      // always make sure html is the last element
      .concat(document.documentElement)
      // remove duplicates caused by adding client rects of the same node
      .filter((node, index, array) => array.indexOf(node) === index);
  }

  return stack;
}

// equivalent to Math.floor(float) but is slightly faster
function floor(float) {
  return float | 0;
}
