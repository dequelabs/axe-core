import findNearbyElms from './find-nearby-elms';
import isInTabOrder from './is-in-tab-order';
import isFocusable from './is-focusable';
import { getRoleType } from '../aria';
import { splitRects, hasVisualOverlap } from '../math';
import memoize from '../../core/utils/memoize';

export default memoize(getTargetSize);

/**
 * Compute the target size of an element.
 * @see https://www.w3.org/TR/WCAG22/#dfn-targets
 */
function getTargetSize(vNode) {
  const nodeRect = vNode.boundingClientRect;
  const overlappingVNodes = findNearbyElms(vNode)
    .filter(filterTargetableWidgets)
    .filter(vNeighbor => {
      return hasVisualOverlap(vNode, vNeighbor)
    });

  if (!overlappingVNodes.length) {
    return {
      rect: nodeRect,
      overlappingVNodes
    };
  }

  return {
    rect: getLargestUnobscuredArea(vNode, overlappingVNodes),
    overlappingVNodes
  };
}

function filterTargetableWidgets(vNode) {
  return (
    getRoleType(vNode) === 'widget' &&
    isFocusable(vNode) &&
    vNode.getComputedStylePropertyValue('pointer-events') !== 'none'
  );
}

// // Filter nearby elements based on if they are overflowing content of vNode
// // Except if the overflowing content is a descendant in the tab order
// function filterOverflowingContent(vNode, nearbyElms) {
//   return nearbyElms.filter(
//     nearbyElm =>
//       !isEnclosedRect(nearbyElm, vNode) &&
//       isDescendantNotInTabOrder(vNode, nearbyElm)
//   );
// }

// function isEnclosedRect(vNodeA, vNodeB) {
//   const rectA = vNodeA.boundingClientRect;
//   const rectB = vNodeB.boundingClientRect;
//   return (
//     rectA.top >= rectB.top &&
//     rectA.left >= rectB.left &&
//     rectA.bottom <= rectB.bottom &&
//     rectA.right <= rectB.right
//   );
// }

// function isDescendantNotInTabOrder(vAncestor, vNode) {
//   return (
//     vAncestor.actualNode.contains(vNode.actualNode) && !isInTabOrder(vNode)
//   );
// }

// // Return fully and partially obscuring nodes from nearby nodes
// function filterByElmsOverlap(vNode, nearbyElms) {
//   const fullyObscuringElms = [];
//   const partialObscuringElms = [];
//   for (const vNeighbor of nearbyElms) {
//     // Determine if the element is obscured
//     if (
//       !isDescendantNotInTabOrder(vNode, vNeighbor) &&
//       hasVisualOverlap(vNode, vNeighbor) &&
//       getCssPointerEvents(vNeighbor) !== 'none'
//     ) {
//       // Group by fully or partially obscured
//       if (isEnclosedRect(vNode, vNeighbor)) {
//         fullyObscuringElms.push(vNeighbor);
//       } else {
//         partialObscuringElms.push(vNeighbor);
//       }
//     }
//   }
//   return { fullyObscuringElms, partialObscuringElms };
// }

// function getCssPointerEvents(vNode) {
//   return vNode.getComputedStylePropertyValue('pointer-events');
// }

// // Filter only focusable widgets
// function filterFocusableWidgets(vNodes) {
//   return vNodes.filter(
//     vNode => getRoleType(vNode) === 'widget' && isFocusable(vNode)
//   );
// }

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