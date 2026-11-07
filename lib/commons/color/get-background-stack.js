import getTextElementStack from '../dom/get-text-element-stack';
import { getNodeFromTree } from '../../core/utils';
import elementHasImage from './element-has-image';
import getOwnBackgroundColor from './get-own-background-color';
import incompleteData from './incomplete-data';

/**
 * Get all elements rendered underneath the current element,
 * In the order they are displayed (front to back)
 *
 * @method getBackgroundStack
 * @memberof axe.commons.color
 * @param {Element} node
 * @return {Array}
 */
export default function getBackgroundStack(node) {
  const stacks = getTextElementStack(node).map(stack => {
    stack = sortPageBackground(stack);
    return stack;
  });

  // elements below an opaque element can't contribute to the background
  // color, so they are left out when comparing the stacks of each text rect
  // @see https://github.com/dequelabs/axe-core/issues/5127
  const visibleStacks = stacks.map(removeHiddenBackgrounds);

  for (let index = 0; index < stacks.length; index++) {
    const stack = stacks[index];

    if (stack[0] !== node) {
      incompleteData.set('bgColor', 'bgOverlap');
      return null;
    }

    // verify stacks are the same
    if (
      index !== 0 &&
      !shallowArraysEqual(visibleStacks[index], visibleStacks[0])
    ) {
      incompleteData.set('bgColor', 'elmPartiallyObscuring');
      return null;
    }
  }

  return stacks[0] || null;
}

/**
 * Look at document and body elements for relevant background information
 * @method sortPageBackground
 * @private
 * @param {Array} elmStack
 * @returns {Array}
 */
function sortPageBackground(elmStack) {
  const bodyIndex = elmStack.indexOf(document.body);
  const bgNodes = elmStack;

  // body can sometimes appear out of order in the stack when it
  // is not the first element due to negative z-index elements.
  // however, we only want to change order if the html element
  // does not define a background color (ya, it's a strange edge
  // case. it turns out that if html defines a background it treats
  // body as a normal element, but if it doesn't then body is treated
  // as the "html" element)
  const htmlBgColor = getOwnBackgroundColor(
    window.getComputedStyle(document.documentElement)
  );
  if (
    bodyIndex > 1 &&
    htmlBgColor.alpha === 0 &&
    !elementHasImage(document.documentElement)
  ) {
    // Only remove document.body if it was originally contained within the element stack
    if (bodyIndex > 1) {
      bgNodes.splice(bodyIndex, 1);

      // Put the body background as the lowest element
      bgNodes.push(document.body);
    }

    const htmlIndex = bgNodes.indexOf(document.documentElement);
    if (htmlIndex > 0) {
      bgNodes.splice(htmlIndex, 1);

      // Put the html background as the lowest element
      bgNodes.push(document.documentElement);
    }
  }
  return bgNodes;
}

/**
 * Remove the elements that are painted below the first element that fully
 * hides what is behind it
 * @method removeHiddenBackgrounds
 * @private
 * @param {Element[]} elmStack
 * @returns {Element[]}
 */
function removeHiddenBackgrounds(elmStack) {
  const opaqueIndex = elmStack.findIndex(isOpaque);
  if (opaqueIndex === -1) {
    return elmStack;
  }

  return elmStack.slice(0, opaqueIndex + 1);
}

/**
 * Check if an element has an opaque background color that isn't made
 * see-through by its own or an ancestor stacking context's opacity, blend
 * mode, or filter
 * @method isOpaque
 * @private
 * @param {Element} elm
 * @returns {Boolean}
 */
function isOpaque(elm) {
  const vNode = getNodeFromTree(elm);
  if (!vNode) {
    return false;
  }

  const bgColor = getOwnBackgroundColor(window.getComputedStyle(elm));
  if (bgColor.alpha !== 1) {
    return false;
  }

  const stackingOrder = vNode._stackingOrder ?? [];
  const contextNodes = stackingOrder
    .map(({ vNode: contextNode }) => contextNode)
    .filter(contextNode => !!contextNode);

  return [...contextNodes, vNode].every(isSolidContext);
}

/**
 * Check if a node is painted without transparency or blending
 * @method isSolidContext
 * @private
 * @param {VirtualNode} vNode
 * @returns {Boolean}
 */
function isSolidContext(vNode) {
  const opacity = parseFloat(vNode.getComputedStylePropertyValue('opacity'));
  const blendMode = vNode.getComputedStylePropertyValue('mix-blend-mode');
  const filter = vNode.getComputedStylePropertyValue('filter');

  return (
    opacity === 1 &&
    (!blendMode || blendMode === 'normal') &&
    (!filter || filter === 'none')
  );
}

/**
 * Check to see if two arrays are equal
 * @see https://stackoverflow.com/a/16436975/2124254
 */
function shallowArraysEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
