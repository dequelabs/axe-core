import { findNearbyElms, isFocusable, isInTabOrder, getTargetSize } from '../../commons/dom';
import { getRoleType } from '../../commons/aria';
import { splitRects, hasVisualOverlap } from '../../commons/math';

const roundingMargin = 0.05;

/**
 * Determine if an element has a minimum size, taking into account
 * any elements that may obscure it.
 */
export default function targetSizeEvaluate(node, options, vNode) {
  const minSize = options?.minSize || 24;
  const nearbyElms = findNearbyElms(vNode);
  const overflowingContent = filterOverflowingContent(vNode, nearbyElms);
  const { rect, overlappingVNodes } = getTargetSize(vNode, minSize);
  const overlappingWidgets = filterFocusableWidgets(overlappingVNodes)
    .filter(overlappingVNode => {
      return !isDescendantNotInTabOrder(vNode, overlappingVNode)
    });

  // const { fullyObscuringElms, partialObscuringElms } = filterByElmsOverlap(
  //   vNode,
  //   nearbyElms
  // );

  // Target is fully obscured and no overflowing content (which may not be obscured)
  if (!rect && !overflowingContent.length) {
    this.relatedNodes(mapActualNodes(overlappingWidgets));
    this.data({ messageKey: 'obscured' });
    return true;
  }

  // Check cannot fail if the target is not in the tab order
  const negativeOutcome = isInTabOrder(vNode) ? false : undefined;
  const hasMinimumSize = rectHasMinimumSize(minSize, rect);
  const decimalRect = toDecimalSize(rect);

  // Target is too small, and has no overflowing content that increases the size
  if (!hasMinimumSize && !overflowingContent.length) {
    this.data({ minSize, ...decimalRect });
    return negativeOutcome;
  }

  // Target has overflowing content;
  //   and is either not fully obscured (so may not pass),
  //   or has insufficient space (and so may not fail)
  if (overflowingContent.length && (
    !rect || !hasMinimumSize
  )) {
    this.data({ minSize, messageKey: 'contentOverflow' });
    this.relatedNodes(mapActualNodes(overflowingContent));
    return undefined;
  }

  // Target is obscured, and insufficient space is left
  if (!overlappingWidgets.length && !hasMinimumSize) {
    const allTabbable = overlappingWidgets.every(isInTabOrder);
    const messageKey = `partiallyObscured${allTabbable ? '' : 'NonTabbable'}`;

    this.data({ messageKey, minSize, ...decimalRect });
    this.relatedNodes(mapActualNodes(overlappingWidgets));
    return allTabbable ? negativeOutcome : undefined;
  }

  // Target not obscured, or has sufficient space
  this.data({ minSize, ...decimalRect });
  this.relatedNodes(mapActualNodes(overlappingWidgets));
  return true;
}

// Filter nearby elements based on if they are overflowing content of vNode
// Except if the overflowing content is a descendant in the tab order
function filterOverflowingContent(vNode, nearbyElms) {
  return nearbyElms.filter(
    nearbyElm =>
      !isEnclosedRect(nearbyElm, vNode) &&
      isDescendantNotInTabOrder(vNode, nearbyElm)
  );
}

// Return fully and partially obscuring nodes from nearby nodes
function filterByElmsOverlap(vNode, nearbyElms) {
  const fullyObscuringElms = [];
  const partialObscuringElms = [];
  for (const vNeighbor of nearbyElms) {
    // Determine if the element is obscured
    if (
      !isDescendantNotInTabOrder(vNode, vNeighbor) &&
      hasVisualOverlap(vNode, vNeighbor) &&
      getCssPointerEvents(vNeighbor) !== 'none'
    ) {
      // Group by fully or partially obscured
      if (isEnclosedRect(vNode, vNeighbor)) {
        fullyObscuringElms.push(vNeighbor);
      } else {
        partialObscuringElms.push(vNeighbor);
      }
    }
  }
  return { fullyObscuringElms, partialObscuringElms };
}

// Find areas of the target that are not obscured
function getLargestUnobscuredArea(vNode, obscuredNodes) {
  const nodeRect = vNode.boundingClientRect;
  if (obscuredNodes.length === 0) {
    return null;
  }
  const obscuringRects = obscuredNodes.map(
    ({ boundingClientRect: rect }) => rect
  );
  const unobscuredRects = splitRects(nodeRect, obscuringRects);
  // Of the unobscured inner rects, work out the largest
  return getLargestRect(unobscuredRects);
}

// Find the largest rectangle in the array, prioritize ones that meet a minimum size
function getLargestRect(rects, minSize) {
  return rects.reduce((rectA, rectB) => {
    const rectAisMinimum = rectHasMinimumSize(minSize, rectA);
    const rectBisMinimum = rectHasMinimumSize(minSize, rectB);
    // Prioritize rects that pass the minimum
    if (rectAisMinimum !== rectBisMinimum) {
      return rectAisMinimum ? rectA : rectB;
    }
    const areaA = rectA.width * rectA.height;
    const areaB = rectB.width * rectB.height;
    return areaA > areaB ? rectA : rectB;
  });
}

// Filter only focusable widgets
function filterFocusableWidgets(vNodes) {
  return vNodes.filter(
    vNode => getRoleType(vNode) === 'widget' && isFocusable(vNode)
  );
}

function isEnclosedRect(vNodeA, vNodeB) {
  const rectA = vNodeA.boundingClientRect;
  const rectB = vNodeB.boundingClientRect;
  return (
    rectA.top >= rectB.top &&
    rectA.left >= rectB.left &&
    rectA.bottom <= rectB.bottom &&
    rectA.right <= rectB.right
  );
}

function getCssPointerEvents(vNode) {
  return vNode.getComputedStylePropertyValue('pointer-events');
}

function toDecimalSize(rect) {
  return {
    width: Math.round(rect.width * 10) / 10,
    height: Math.round(rect.height * 10) / 10
  };
}

function isDescendantNotInTabOrder(vAncestor, vNode) {
  return (
    vAncestor.actualNode.contains(vNode.actualNode) && !isInTabOrder(vNode)
  );
}

function rectHasMinimumSize(minSize, { width, height }) {
  return (
    width + roundingMargin >= minSize && height + roundingMargin >= minSize
  );
}

function mapActualNodes(vNodes) {
  return vNodes.map(({ actualNode }) => actualNode);
}
