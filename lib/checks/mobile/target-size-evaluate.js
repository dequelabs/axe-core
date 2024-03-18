import { findNearbyElms, isFocusable, isInTabOrder } from '../../commons/dom';
import { getRoleType } from '../../commons/aria';
import {
  splitRects,
  rectHasMinimumSize,
  hasVisualOverlap
} from '../../commons/math';

/**
 * Determine if an element has a minimum size, taking into account
 * any elements that may obscure it.
 */
export default function targetSizeEvaluate(node, options, vNode) {
  const minSize = options?.minSize || 24;
  const nodeRect = vNode.boundingClientRect;
  // Bail early to avoid hitting very expensive calculations.
  // Targets are so large they are unlikely to fail.
  if (rectHasMinimumSize(minSize * 10, nodeRect)) {
    this.data({ messageKey: 'large', minSize });
    return true;
  }

  const hasMinimumSize = rectHasMinimumSize.bind(null, minSize);
  const nearbyElms = findNearbyElms(vNode);
  const overflowingContent = filterOverflowingContent(vNode, nearbyElms);
  const { fullyObscuringElms, partialObscuringElms } = filterByElmsOverlap(
    vNode,
    nearbyElms
  );

  // Target has overflowing content;
  //   and is either not fully obscured (so may not pass),
  //   or has insufficient space (and so may not fail)
  if (
    overflowingContent.length &&
    (fullyObscuringElms.length || !hasMinimumSize(nodeRect))
  ) {
    this.data({ minSize, messageKey: 'contentOverflow' });
    this.relatedNodes(mapActualNodes(overflowingContent));
    return undefined;
  }

  // Target is fully obscured and no overflowing content (which may not be obscured)
  if (fullyObscuringElms.length) {
    this.relatedNodes(mapActualNodes(fullyObscuringElms));
    this.data({ messageKey: 'obscured' });
    return true;
  }

  // Check cannot fail if the target is not in the tab order
  const negativeOutcome = isInTabOrder(vNode) ? false : undefined;

  // Target is too small, and has no overflowing content that increases the size
  if (!hasMinimumSize(nodeRect)) {
    this.data({ minSize, ...toDecimalSize(nodeRect) });
    return negativeOutcome;
  }

  // Figure out the largest space on the target, not obscured by other widgets
  const obscuredWidgets = filterFocusableWidgets(partialObscuringElms);

  // Target not obscured and has sufficient space
  if (!obscuredWidgets.length) {
    this.data({ minSize, ...toDecimalSize(nodeRect) });
    return true;
  }

  const largestInnerRect = getLargestUnobscuredArea(vNode, obscuredWidgets);
  if (!largestInnerRect) {
    this.data({ minSize, messageKey: 'tooManyRects' });
    return undefined;
  }

  // Target is obscured, and insufficient space is left
  if (!hasMinimumSize(largestInnerRect)) {
    if (overflowingContent.length) {
      this.data({ minSize, messageKey: 'contentOverflow' });
      this.relatedNodes(mapActualNodes(overflowingContent));
      return undefined;
    }

    const allTabbable = obscuredWidgets.every(isInTabOrder);
    const messageKey = `partiallyObscured${allTabbable ? '' : 'NonTabbable'}`;

    this.data({ messageKey, minSize, ...toDecimalSize(largestInnerRect) });
    this.relatedNodes(mapActualNodes(obscuredWidgets));
    return allTabbable ? negativeOutcome : undefined;
  }

  // Target has sufficient space
  this.data({ minSize, ...toDecimalSize(largestInnerRect || nodeRect) });
  this.relatedNodes(mapActualNodes(obscuredWidgets));
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
  const obscuringRects = obscuredNodes.map(
    ({ boundingClientRect: rect }) => rect
  );
  const unobscuredRects = splitRects(nodeRect, obscuringRects);
  if (unobscuredRects.length === 0) {
    return null;
  }

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

function mapActualNodes(vNodes) {
  return vNodes.map(({ actualNode }) => actualNode);
}
