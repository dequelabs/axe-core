import incompleteData from './incomplete-data';
import getBackgroundStack from './get-background-stack';
import getOwnBackgroundColor from './get-own-background-color';
import elementHasImage from './element-has-image';
import Color from './color';
import flattenColors from './flatten-colors';
import flattenShadowColors from './flatten-shadow-colors';
import getTextShadowColors from './get-text-shadow-colors';
import visuallyContains from '../dom/visually-contains';
import getVisibleTextRects from '../dom/get-visible-text-rects';

/**
 * Returns background color for element
 * Uses getBackgroundStack() to get all elements rendered underneath the current element,
 * to help determine the composite background color.
 *
 * @method getBackgroundColor
 * @memberof axe.commons.color
 * @param  {Element} elm Element to determine background color
 * @param  {Array}   [bgElms=[]] elements to inspect
 * @param  {Number}  shadowOutlineEmMax Thickness of `text-shadow` at which it becomes a background color
 * @returns {Color}
 */
export default function getBackgroundColor(
  elm,
  bgElms = [],
  shadowOutlineEmMax = 0.1
) {
  let bgColors = getTextShadowColors(elm, { minRatio: shadowOutlineEmMax });
  if (bgColors.length) {
    bgColors = [{ color: bgColors.reduce(flattenShadowColors) }];
  }

  const elmStack = getBackgroundStack(elm);
  const textRects = getVisibleTextRects(elm);

  // Search the stack until we have an alpha === 1 background
  (elmStack || []).some(bgElm => {
    const bgElmStyle = window.getComputedStyle(bgElm);

    if (elementHasImage(bgElm, bgElmStyle)) {
      bgColors = null;
      bgElms.push(bgElm);

      return true;
    }

    // Get the background color
    const bgColor = getOwnBackgroundColor(bgElmStyle);
    if (bgColor.alpha === 0) {
      return;
    }

    if (
      // abort if a node is partially obscured and obscuring element has a background
      !fullyEncompases(bgElm, textRects)
    ) {
      bgColors = null;
      bgElms.push(bgElm);
      incompleteData.set('bgColor', 'elmPartiallyObscured');

      return true;
    }

    // store elements contributing to the br color.
    bgElms.push(bgElm);
    const blendMode = bgElmStyle.getPropertyValue('mix-blend-mode');
    bgColors.unshift({
      color: bgColor,
      blendMode: normalizeBlendMode(blendMode)
    });

    // Exit if the background is opaque
    return bgColor.alpha === 1;
  });

  if (bgColors === null || elmStack === null) {
    return null;
  }

  const pageBgs = getPageBackgroundColors(
    elm,
    elmStack.includes(document.body)
  );
  bgColors.unshift(...pageBgs);

  // default to white if bgColors is empty
  if (bgColors.length === 0) {
    return new Color(255, 255, 255, 1);
  }
  // Mix the colors together. Colors must be mixed in bottom up
  // order (background to foreground order) to produce the correct
  // result.
  // @see https://github.com/dequelabs/axe-core/issues/2924
  const blendedColor = bgColors.reduce((bgColor, fgColor) => {
    return flattenColors(
      fgColor.color,
      bgColor.color instanceof Color ? bgColor.color : bgColor,
      fgColor.blendMode
    );
  });

  // default page background is white which must be mixed last
  // @see https://www.w3.org/TR/compositing-1/#pagebackdrop
  return flattenColors(
    blendedColor.color instanceof Color ? blendedColor.color : blendedColor,
    new Color(255, 255, 255, 1)
  );
}

/**
 * Determine if element is partially overlapped, triggering a Can't Tell result
 * @private
 * @param {Element} elm
 * @param {Element} bgElm
 * @param {Object} bgColor
 * @return {Boolean}
 */
// function elmPartiallyObscured(elm, bgElm, bgColor) {
//   var obscured =
//     elm !== bgElm && !visuallyContains(elm, bgElm) && bgColor.alpha !== 0;
//   if (obscured) {
//     incompleteData.set('bgColor', 'elmPartiallyObscured');
//   }
//   return obscured;
// }

function normalizeBlendMode(blendmode) {
  return !!blendmode ? blendmode : undefined;
}
/**
 * Get the page background color.
 * @private
 * @param {Element} elm
 * @param {Boolean} stackContainsBody
 * @return {Colors[]}
 */
function getPageBackgroundColors(elm, stackContainsBody) {
  const pageColors = [];

  // Body can sometimes appear out of order in the stack:
  //   1) Body is not the first element due to negative z-index elements
  //   2) Elements are positioned outside of body's rect coordinates
  //      (see https://github.com/dequelabs/axe-core/issues/1456)
  // In those instances we need to determine if we should use the
  // body background or the html background color
  if (!stackContainsBody) {
    // if the html element defines a bgColor and body defines a
    // bgColor but body's height is not the full viewport, then the
    // html bgColor fills the full viewport and body bgColor only
    // fills to its size. however, if the html element does not
    // define a bgColor, then the body bgColor fills the full
    // viewport. so if the body wasn't added to the elmStack, we
    // need to know which bgColor to get (html or body)
    const html = document.documentElement;
    const body = document.body;
    const htmlStyle = window.getComputedStyle(html);
    const bodyStyle = window.getComputedStyle(body);
    const htmlBgColor = getOwnBackgroundColor(htmlStyle);
    const bodyBgColor = getOwnBackgroundColor(bodyStyle);
    const bodyBgColorApplies =
      bodyBgColor.alpha !== 0 && visuallyContains(elm, body);
    if (
      (bodyBgColor.alpha !== 0 && htmlBgColor.alpha === 0) ||
      (bodyBgColorApplies && bodyBgColor.alpha !== 1)
    ) {
      pageColors.unshift({
        color: bodyBgColor,
        blendMode: normalizeBlendMode(
          bodyStyle.getPropertyValue('mix-blend-mode')
        )
      });
    }

    if (
      htmlBgColor.alpha !== 0 &&
      (!bodyBgColorApplies || (bodyBgColorApplies && bodyBgColor.alpha !== 1))
    ) {
      pageColors.unshift({
        color: htmlBgColor,
        blendMode: normalizeBlendMode(
          htmlStyle.getPropertyValue('mix-blend-mode')
        )
      });
    }
  }

  return pageColors;
}

// function getBackgroundStack(node) {
//   const vNode = axe.utils.getNodeFromTree(node);

//   // 1. get text rects
//   const textElementStack = getTextElementStacks(node);
//   let stacks = textElementStack.stacks;
//   stacks = stacks.map(stack => {
//     stack = reduceToElementsBelowFloating(stack, node);
//     stack = sortPageBackground(stack);

//     // TODO: 2. filter out rects above node that don't have background color

//     return stack;
//   });

//   for (let index = 0; index < stacks.length; index++) {
//     let stack = stacks[index];

//     // 3. check if stack is the top element in the stack
//     if (stack[0] !== vNode.actualNode) {
//       incompleteData.set('bgColor', 'bgOverlap');
//       return null;
//     }

//     // 4. verify stacks are the same
//     if (index !== 0) {
//       if (!arraysEqual(stack, stacks[0])) {
//         incompleteData.set('bgColor', 'elmPartiallyObscuring');
//         return null;
//       }
//     }
//   }

//   let stack = stacks[0];
//   stack.rects = textElementStack.rects;

//   return stack;
// }

// const getOverflowHiddenNodes = memoize(function getOverflowHiddenNodesMemoized(
//   vNode
// ) {
//   const ancestors = [];

//   if (!vNode) {
//     return ancestors;
//   }

//   const overflow = vNode.getComputedStylePropertyValue('overflow');

//   if (overflow === 'hidden') {
//     ancestors.push(vNode);
//   }

//   return ancestors.concat(getOverflowHiddenNodes(vNode.parent));
// });

// function normalizeBlendMode(blendmode) {
//   return !!blendmode ? blendmode : undefined;
// }

function fullyEncompases(node, rects) {
  const nodeRect = node.getBoundingClientRect();
  const style = window.getComputedStyle(node);
  const overflow = style.getPropertyValue('overflow');

  if (style.getPropertyValue('display') === 'inline') {
    return true;
  }

  if (
    ['scroll', 'auto'].includes(overflow) ||
    node instanceof window.HTMLHtmlElement
  ) {
    nodeRect.width = node.scrollWidth;
    nodeRect.height = node.scrollHeight;
    nodeRect.right = nodeRect.left + nodeRect.width;
    nodeRect.bottom = nodeRect.top + nodeRect.height;
  }

  return rects.every(rect => {
    return (
      rect.top >= nodeRect.top &&
      rect.bottom <= nodeRect.bottom &&
      rect.left >= nodeRect.left &&
      rect.right <= nodeRect.right
    );
  });
}

// function arraysEqual(a, b) {
//   if (a === b) return true;
//   if (a == null || b == null) return false;
//   if (a.length !== b.length) return false;

//   // If you don't care about the order of the elements inside
//   // the array, you should sort both arrays here.
//   // Please note that calling sort on an array will modify that array.
//   // you might want to clone your array first.

//   for (var i = 0; i < a.length; ++i) {
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// }

// function getTextElementStacks(node) {
//   axe.commons.dom.createGrid();

//   const vNode = axe.utils.getNodeFromTree(node);
//   const grid = vNode._grid;

//   if (!grid) {
//     return [];
//   }

//   // for code blocks that use syntax highlighting, you can get a ton of client
//   // rects (See https://github.com/dequelabs/axe-core/issues/1985). they use
//   // a mixture of text nodes and other nodes (which will contain their own text
//   // nodes), but all we care about is checking the direct text nodes as the
//   // other nodes will have their own client rects checked. doing this speeds up
//   // color contrast significantly for large syntax highlighted code blocks
//   const nodeRect = vNode.boundingClientRect;
//   const clientRects = [];
//   Array.from(node.childNodes).forEach(elm => {
//     if (elm.nodeType === 3 && axe.commons.text.sanitize(elm.textContent) !== '') {
//       const range = document.createRange();
//       range.selectNodeContents(elm);
//       const rects = range.getClientRects();

//       // if any text rect is larger than the bounds of the parent,
//       // or goes outside of the bounds of the parent, we need to use
//       // the parent rect so we stay within the bounds of the element.
//       //
//       // since we use the midpoint of the element when determining
//       // the rect stack we will also use the midpoint of the text rect
//       // to determine out of bounds.
//       //
//       // @see https://github.com/dequelabs/axe-core/issues/2178
//       // @see https://github.com/dequelabs/axe-core/issues/2483
//       // @see https://github.com/dequelabs/axe-core/issues/2681
//       const outsideRectBounds = Array.from(rects).some(rect => {
//         const horizontalMidpoint = rect.left + rect.width / 2;
//         const verticalMidpoint = rect.top + rect.height / 2;

//         return (
//           horizontalMidpoint < nodeRect.left ||
//           horizontalMidpoint > nodeRect.right ||
//           verticalMidpoint < nodeRect.top ||
//           verticalMidpoint > nodeRect.bottom
//         );
//       });
//       if (outsideRectBounds) {
//         return;
//       }

//       const overflowHiddenNodes = getOverflowHiddenNodes(vNode);

//       for (let i = 0; i < rects.length; i++) {
//         let rect = rects[i];

//         // filter out 0 width and height rects (newline characters)
//         // ie11 has newline characters return 0.00998, so we'll say if the
//         // line is < 1 it shouldn't be counted
//         // also filter out rects that go outside the bounds of an overflow ancestor
//         if (rect.width >= 1 && rect.height >= 1) {
//           overflowHiddenNodes.forEach(overflowNode => {
//             rect = getIntersectionRect(rect, overflowNode.boundingClientRect);
//             if (!rect) {
//               return;
//             }
//           });

//           if (rect) {
//             clientRects.push(rect);
//           }
//         }
//       }
//     }
//   });

//   if (!clientRects.length) {
//     return {
//       rects: [node.getBoundingClientRect()],
//       stacks: [axe.commons.dom.getElementStack(node)]
//     };
//   }

//   // let map = new Map();
//   // clientRects.forEach(rect => {
//   //   map.set(rect, axe.commons.dom.getRectStack(grid, rect));
//   // });

//   return {
//     rects: clientRects,
//     stacks: clientRects.map(rect => {
//       return axe.commons.dom.getRectStack(grid, rect)
//     })
//   };
// }

// function getIntersectionRect(r1, r2) {
//   const leftX   = Math.max( r1.left, r2.left );
//   const rightX  = Math.min( r1.left + r1.width, r2.left + r2.width );
//   const topY    = Math.max( r1.top, r2.top );
//   const bottomY = Math.min( r1.top + r1.height, r2.top + r2.height );

//   if ( leftX < rightX && topY < bottomY ) {
//     return {
//       left: leftX,
//       top: topY,
//       width: rightX-leftX,
//       height: bottomY-topY,
//       bottom: bottomY,
//       right: rightX
//     };
//   }
// }

// function sortPageBackground(elmStack) {
//   const bodyIndex = elmStack.indexOf(document.body);
//   const bgNodes = elmStack;

//   // body can sometimes appear out of order in the stack when it
//   // is not the first element due to negative z-index elements.
//   // however, we only want to change order if the html element
//   // does not define a background color (ya, it's a strange edge
//   // case. it turns out that if html defines a background it treats
//   // body as a normal element, but if it doesn't then body is treated
//   // as the "html" element)
//   const htmlBgColor = getOwnBackgroundColor(
//     window.getComputedStyle(document.documentElement)
//   );
//   if (
//     bodyIndex > 1 &&
//     htmlBgColor.alpha === 0 &&
//     !elementHasImage(document.documentElement)
//   ) {
//     // Only remove document.body if it was originally contained within the element stack
//     if (bodyIndex > 1) {
//       bgNodes.splice(bodyIndex, 1);

//       // Put the body background as the lowest element
//       bgNodes.push(document.body);
//     }

//     const htmlIndex = bgNodes.indexOf(document.documentElement);
//     if (htmlIndex > 0) {
//       bgNodes.splice(htmlIndex, 1);

//       // Put the html background as the lowest element
//       bgNodes.push(document.documentElement);
//     }
//   }
//   return bgNodes;
// }
