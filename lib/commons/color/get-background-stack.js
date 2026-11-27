import getTextElementStack from '../dom/get-text-element-stack';
import getVisibleChildTextRects from '../dom/get-visible-child-text-rects';
import getComposedParent from '../dom/get-composed-parent';
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

  for (let index = 0; index < stacks.length; index++) {
    const stack = stacks[index];

    if (stack[0] !== node) {
      incompleteData.set('bgColor', 'bgOverlap');
      return null;
    }

    // verify stacks are the same
    if (
      index !== 0 &&
      !shallowArraysEqual(stack, stacks[0]) &&
      !shallowArraysEqual(
        getVisibleBackgroundStack(stack, node),
        getVisibleBackgroundStack(stacks[0], node)
      )
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

/**
 * Ignore layers hidden behind an opaque ancestor when comparing text lines.
 * Keep the original stack for the subsequent color and stacking-context calculation.
 * Effects which can expose lower layers or paint over text retain the full stack.
 * @param {Element[]} stack
 * @param {Element} node
 * @return {Element[]}
 */
function getVisibleBackgroundStack(stack, node) {
  const ancestors = [];
  for (
    let ancestor = node;
    ancestor;
    ancestor = ancestor.assignedSlot || getComposedParent(ancestor)
  ) {
    const style = window.getComputedStyle(ancestor);
    if (
      style.getPropertyValue('opacity') !== '1' ||
      style.getPropertyValue('filter') !== 'none' ||
      style.getPropertyValue('clip-path') !== 'none' ||
      ['overflow-x', 'overflow-y'].some(property =>
        ['hidden', 'clip'].includes(style.getPropertyValue(property))
      ) ||
      style.getPropertyValue('transform') !== 'none' ||
      style.getPropertyValue('mix-blend-mode') !== 'normal' ||
      !['', 'none'].includes(style.getPropertyValue('backdrop-filter')) ||
      !['', 'none'].includes(style.getPropertyValue('mask-image')) ||
      ['::before', '::after'].some(
        pseudo =>
          !['none', 'normal'].includes(
            window.getComputedStyle(ancestor, pseudo).content
          )
      )
    ) {
      return stack;
    }
    ancestors.push(ancestor);
  }

  const rects = getVisibleChildTextRects(node);
  for (let index = 0; index < stack.length; index++) {
    const background = stack[index];
    if (!ancestors.includes(background)) {
      continue;
    }
    const style = window.getComputedStyle(background);
    if (
      style.backgroundImage !== 'none' ||
      style.backgroundClip !== 'border-box' ||
      [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius'
      ].some(property => parseFloat(style[property]) !== 0)
    ) {
      continue;
    }
    const bounds = getNodeFromTree(background).boundingClientRect;
    if (
      getOwnBackgroundColor(style).alpha === 1 &&
      rects.every(
        rect =>
          rect.top >= bounds.top &&
          rect.bottom <= bounds.bottom &&
          rect.left >= bounds.left &&
          rect.right <= bounds.right
      )
    ) {
      return stack.slice(0, index + 1);
    }
  }
  return stack;
}
