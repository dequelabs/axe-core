import visuallySort from './visually-sort';
import { getRectCenter } from '../math';

export function getRectStack(grid, rect, recursed = false) {
  const center = getRectCenter(rect);
  const gridCell = grid.getCellFromPoint(center) || [];

  const floorX = Math.floor(center.x);
  const floorY = Math.floor(center.y);
  let stack = gridCell.filter(gridCellNode => {
    return gridCellNode.clientRects.some(clientRect => {
      const rectX = clientRect.left;
      const rectY = clientRect.top;

      // perform an AABB (axis-aligned bounding box) collision check for the
      // point inside the rect
      // account for differences in how browsers handle floating point
      // precision of bounding rects
      return (
        floorX < Math.floor(rectX + clientRect.width) &&
        floorX >= Math.floor(rectX) &&
        floorY < Math.floor(rectY + clientRect.height) &&
        floorY >= Math.floor(rectY)
      );
    });
  });

  // a scroll region's container is only added to a grid if it is visible
  // on screen, but its descendants can be visible even if it is not
  // (e.g. an offscreen container with a child positioned back on screen),
  // so continue from the nearest ancestor that is in a grid
  let gridContainer = grid.container;
  while (gridContainer && !gridContainer._grid) {
    gridContainer = gridContainer.parent;
  }
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
