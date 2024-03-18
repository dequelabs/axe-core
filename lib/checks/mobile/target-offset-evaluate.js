import { findNearbyElms, isFocusable, isInTabOrder } from '../../commons/dom';
import { getRoleType } from '../../commons/aria';
import { getOffset, rectHasMinimumSize } from '../../commons/math';

const roundingMargin = 0.05;

export default function targetOffsetEvaluate(node, options, vNode) {
  const minOffset = options?.minOffset || 24;
  // Bail early to avoid hitting very expensive calculations.
  // Targets are so large they are unlikely to fail.
  if (rectHasMinimumSize(minOffset * 10, vNode.boundingClientRect)) {
    this.data({ messageKey: 'large', minOffset });
    return true;
  }

  const closeNeighbors = [];
  let closestOffset = minOffset;
  for (const vNeighbor of findNearbyElms(vNode, minOffset)) {
    if (getRoleType(vNeighbor) !== 'widget' || !isFocusable(vNeighbor)) {
      continue;
    }
    // the offset code works off radius but we want our messaging to reflect diameter
    const offset =
      roundToSingleDecimal(getOffset(vNode, vNeighbor, minOffset / 2)) * 2;
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
