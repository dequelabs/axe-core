import filteredRectStack from './filtered-rect-stack';
import elementHasImage from './element-has-image';
import getOwnBackgroundColor from './get-own-background-color';
import incompleteData from './incomplete-data';
import shadowElementsFromPoint from '../dom/shadow-elements-from-point';
import reduceToElementsBelowFloating from '../dom/reduce-to-elements-below-floating';

/**
 * Determines overlap of node's content with a bgNode. Used for inline elements
 * @private
 * @param {Element} targetElement
 * @param {Element} bgNode
 * @return {Boolean}
 */
function contentOverlapping(targetElement, bgNode) {
  // get content box of target element
  // check to see if the current bgNode is overlapping
  var targetRect = targetElement.getClientRects()[0];
  var obscuringElements = shadowElementsFromPoint(
    targetRect.left,
    targetRect.top
  );
  if (obscuringElements) {
    for (var i = 0; i < obscuringElements.length; i++) {
      if (
        obscuringElements[i] !== targetElement &&
        obscuringElements[i] === bgNode
      ) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Calculate alpha transparency of a background element obscuring the current node
 * @private
 * @param {Number} elmIndex
 * @param {Array} elmStack
 * @param {Element} originalElm
 * @return {Number|undefined}
 */
function calculateObscuringElement(elmIndex, elmStack, originalElm) {
  if (elmIndex > 0) {
    // there are elements above our element, check if they contribute to the background
    for (var i = elmIndex - 1; i >= 0; i--) {
      const bgElm = elmStack[i];
      if (contentOverlapping(originalElm, bgElm)) {
        return true;
      } else {
        // remove elements not contributing to the background
        elmStack.splice(i, 1);
      }
    }
  }

  return false;
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

      // Put the body background as the lowest element
      bgNodes.push(document.documentElement);
    }
  }
  return bgNodes;
}

/**
 * Get all elements rendered underneath the current element,
 * In the order they are displayed (front to back)
 *
 * @method getBackgroundStack
 * @memberof axe.commons.color
 * @param {Element} elm
 * @return {Array}
 */
function getBackgroundStack(elm) {
  let elmStack = filteredRectStack(elm);

  if (elmStack === null) {
    return null;
  }
  elmStack = reduceToElementsBelowFloating(elmStack, elm);
  elmStack = sortPageBackground(elmStack);

  // Return all elements BELOW the current element, null if the element is undefined
  const elmIndex = elmStack.indexOf(elm);
  if (calculateObscuringElement(elmIndex, elmStack, elm)) {
    // if the total of the elements above our element results in total obscuring, return null
    incompleteData.set('bgColor', 'bgOverlap');
    return null;
  }
  return elmIndex !== -1 ? elmStack : null;
}

export default getBackgroundStack;
