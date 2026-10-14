import getNodeGrid from './get-node-grid';
import isFixedPosition from './is-fixed-position';
import getIntersectionRect from '../math/get-intersection-rect';

/**
 * Find the elements in the grid cells around a node. Searches the node's
 * grid, then the grids of its enclosing scroll containers (which hold absolute
 * elements whose containing block is outside the scroll container) using only
 * the part of the node that is inside each scroll container.
 * @method findNearbyElms
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @param {Number} [margin=0] Distance around the node's bounding box to look for elements
 * @param {Object} [options]
 * @param {Boolean} [options.withinMargin=false] Only return elements whose bounding box overlaps the node's bounding box grown by margin. By default, every element in those grid cells is returned, even if it is further away.
 * @returns {VirtualNode[]}
 */
export default function findNearbyElms(
  vNode,
  margin = 0,
  { withinMargin = false } = {}
) {
  let grid = getNodeGrid(vNode);
  if (!grid?.cells?.length) {
    return []; // Elements not in the grid don't have ._grid
  }
  const selfIsFixed = isFixedPosition(vNode);
  const neighbors = [];
  let rect = vNode.boundingClientRect;
  while (grid && rect) {
    const marginRect = withinMargin
      ? new window.DOMRect(
          rect.left - margin,
          rect.top - margin,
          rect.width + margin * 2,
          rect.height + margin * 2
        )
      : null;
    const gridPosition = grid.getGridPositionOfRect(rect, margin);
    grid.loopGridPosition(gridPosition, vNeighbors => {
      for (const vNeighbor of vNeighbors) {
        if (
          vNeighbor &&
          vNeighbor !== vNode &&
          (!marginRect ||
            getIntersectionRect(marginRect, vNeighbor.boundingClientRect)) &&
          !neighbors.includes(vNeighbor) &&
          selfIsFixed === isFixedPosition(vNeighbor)
        ) {
          neighbors.push(vNeighbor);
        }
      }
    });

    // only the part of the node inside its scroll container can be near
    // anything outside of it
    rect =
      grid.container &&
      getIntersectionRect(rect, grid.container.boundingClientRect);
    grid = grid.container?._grid;
  }

  return neighbors;
}
