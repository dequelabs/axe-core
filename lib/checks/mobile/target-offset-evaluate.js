import { findNearbyElms } from '../../commons/dom';
import { getRole, getRoleType } from '../../commons/aria';
import { getOffset } from '../../commons/math';

const roundingMargin = 0.05;

export default function targetOffsetEvaluate(node, options, vNode) {
  const minOffset = options?.minOffset || 24;
  const closeNeighbors = [];
  let closestOffset = minOffset;
  for (const vNeighbor of findNearbyElms(vNode, minOffset)) {
    const role = getRole(vNeighbor);
    if (getRoleType(role) !== 'widget') {
      continue;
    }
    const offset = roundToSingleDecimal(getOffset(vNode, vNeighbor));
    if (offset + roundingMargin >= minOffset) {
      continue;
    }
    closestOffset = Math.min(closestOffset, offset);
    closeNeighbors.push(vNeighbor.actualNode);
  }

  this.data({ closestOffset, minOffset });
  if (closeNeighbors.length > 0) {
    this.relatedNodes(closeNeighbors);
    return false;
  }
  return true;
}

function roundToSingleDecimal(num) {
  return Math.round(num * 10) / 10;
}