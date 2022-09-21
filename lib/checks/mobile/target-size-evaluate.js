import { findNearbyElms, isFocusable } from '../../commons/dom';
import { getRoleType } from '../../commons/aria';
import { splitRects, hasVisualOverlap } from '../../commons/math';

const roundingMargin = 0.05;

/**
 * Determine if an element has a minimum size, taking into account
 * any elements that may obscure it.
 */
export default function targetSize(node, options, vNode) {
  const minSize = options?.minSize || 24;
  const nodeRect = vNode.boundingClientRect;
  const hasMinimumSize = ({ width, height }) => {
    return (
      width + roundingMargin >= minSize && height + roundingMargin >= minSize
    );
  };

  const obscuringElms = [];
  for (const vNeighbor of findNearbyElms(vNode)) {
    if (
      !hasVisualOverlap(vNode, vNeighbor) ||
      getCssPointerEvents(vNeighbor) === 'none'
    ) {
      continue;
    }
    if (isEnclosedRect(vNode, vNeighbor)) {
      this.relatedNodes([vNeighbor.actualNode]);
      this.data({ messageKey: 'obscured' });
      return true;
    }
    obscuringElms.push(vNeighbor);
  }

  if (!hasMinimumSize(nodeRect)) {
    this.data({ minSize, ...toDecimalSize(nodeRect) });
    return false;
  }

  const obscuredWidgets = obscuringElms.filter(
    vNeighbor => getRoleType(vNeighbor) === 'widget' && isFocusable(vNeighbor)
  );

  if (obscuredWidgets.length === 0) {
    this.data({ minSize, ...toDecimalSize(nodeRect) });
    return true; // No obscuring elements; pass
  }
  this.relatedNodes(obscuredWidgets.map(({ actualNode }) => actualNode));

  // Find areas of the target that are not obscured
  const obscuringRects = obscuredWidgets.map(
    ({ boundingClientRect: rect }) => rect
  );
  const unobscuredRects = splitRects(nodeRect, obscuringRects);

  // Of the unobscured inner rects, work out the largest
  const largestInnerRect = unobscuredRects.reduce((rectA, rectB) => {
    const rectAisMinimum = hasMinimumSize(rectA);
    const rectBisMinimum = hasMinimumSize(rectB);
    // Prioritize rects that pass the minimum
    if (rectAisMinimum !== rectBisMinimum) {
      return rectAisMinimum ? rectA : rectB;
    }
    const areaA = rectA.width * rectA.height;
    const areaB = rectB.width * rectB.height;
    return areaA > areaB ? rectA : rectB;
  });

  if (!hasMinimumSize(largestInnerRect)) {
    // Element is (partially?) obscured, with insufficient space
    this.data({
      messageKey: 'partiallyObscured',
      minSize,
      ...toDecimalSize(largestInnerRect)
    });
    return false;
  }

  this.data({ minSize, ...toDecimalSize(largestInnerRect) });
  return true;
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
