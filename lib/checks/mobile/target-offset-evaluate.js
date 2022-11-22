import { findNearbyElms, isFocusable, isInTabOrder } from '../../commons/dom';
import { getRoleType } from '../../commons/aria';
import { getOffset } from '../../commons/math';

const roundingMargin = 0.05;

export default function targetOffsetEvaluate(node, options, vNode) {
  const minOffset = options?.minOffset || 24;
  const closeNeighbors = [];
  let closestOffset = minOffset;
  for (const vNeighbor of findNearbyElms(vNode, minOffset)) {
    if (getRoleType(vNeighbor) !== 'widget' || !isFocusable(vNeighbor)) {
      continue;
    }
    const offset = roundToSingleDecimal(getOffset(vNode, vNeighbor));
    if (offset + roundingMargin >= minOffset) {
      continue;
    }
    closestOffset = Math.min(closestOffset, offset);
    closeNeighbors.push(vNeighbor);
  }

  if (closeNeighbors.length === 0) {
    this.data({ closestOffset, minOffset });
    return true;
  }

  this.relatedNodes(closeNeighbors.map(({ actualNode }) => actualNode));

  if (!closeNeighbors.some(isInTabOrder)) {
    this.data({
      messageKey: 'nonTabbableNeighbor',
      closestOffset,
      minOffset
    });
    return undefined;
  }

  this.data({ closestOffset, minOffset });
  return isInTabOrder(vNode) ? false : undefined;
}

function roundToSingleDecimal(num) {
  return Math.round(num * 10) / 10;
}
