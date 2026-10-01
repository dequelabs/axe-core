import getNodeGrid from './get-node-grid';
import isFixedPosition from './is-fixed-position';
import getIntersectionRect from '../math/get-intersection-rect';

/**
 * Find the elements in the grid cells around a node.
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
  const grid = getNodeGrid(vNode);
  if (!grid?.cells?.length) {
    return []; // Elements not in the grid don't have ._grid
  }
  const rect = vNode.boundingClientRect;
  const selfIsFixed = isFixedPosition(vNode);
  const gridPosition = grid.getGridPositionOfRect(rect, margin);
  const marginRect = withinMargin
    ? new window.DOMRect(
        rect.left - margin,
        rect.top - margin,
        rect.width + margin * 2,
        rect.height + margin * 2
      )
    : null;

  const neighbors = [];
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

  return neighbors;
}
