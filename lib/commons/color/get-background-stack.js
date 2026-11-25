import getTextElementStack from '../dom/get-text-element-stack';
import elementHasImage from './element-has-image';
import getOwnBackgroundColor from './get-own-background-color';
import incompleteData from './incomplete-data';
import { contains, getNodeFromTree } from '../../core/utils';

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

  for (let index = 0; index < stacks.length; index++) {
    const stack = stacks[index];

    if (stack[getBoxedSlotCount(stack, node)] !== node) {
      incompleteData.set('bgColor', 'bgOverlap');
      return null;
    }

    // verify stacks are the same
    if (index !== 0 && !shallowArraysEqual(stack, stacks[0])) {
      incompleteData.set('bgColor', 'elmPartiallyObscuring');
      return null;
    }
  }

  return stacks[0] || null;
}

/**
 * Count the <slot> elements of the node at the top of the stack. A slot with a
 * box (display other than contents) is painted over the node, but it is not
 * part of the flat tree, so the slotted text belongs to the node.
 * @see https://github.com/dequelabs/axe-core/issues/4468
 * @private
 * @param {Element[]} stack
 * @param {Element} node
 * @returns {Number}
 */
function getBoxedSlotCount(stack, node) {
  const vNode = getNodeFromTree(node);
  let count = 0;
  while (count < stack.length) {
    const slotVNode = getNodeFromTree(stack[count]);
    if (slotVNode?.props.nodeName !== 'slot' || !contains(vNode, slotVNode)) {
      break;
    }
    count++;
  }
  return count;
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
