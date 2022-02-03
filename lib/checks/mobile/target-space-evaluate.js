import { findNearbyElms } from '../../commons/dom';
import { getRole, getRoleType } from '../../commons/aria';
import { getOffset } from '../../commons/math';

export default function targetSpaceEvaluate(node, { minSpacing = 23.95 }, vNode) {
  let closestOffset = minSpacing;
  const closeNeighbors = [];
  for (const vNeighbor of findNearbyElms(vNode, minSpacing)) {
    const role = getRole(vNeighbor);
    if (getRoleType(role) !== 'widget') {
      continue;
    }
    const offset = getOffset(vNode, vNeighbor);
    if (offset >= minSpacing) {
      continue;
    }
    closestOffset = Math.min(closestOffset, offset);
    closeNeighbors.push(vNeighbor.actualNode);
  }

  if (closeNeighbors.length === 0) {
    return true;
  }

  this.data({ closestOffset });
  this.relatedNodes(closeNeighbors);
  return false;
}
