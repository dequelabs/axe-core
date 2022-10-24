import filteredRectStack from './filtered-rect-stack';
import elementHasImage from './element-has-image';
import getOwnBackgroundColor from './get-own-background-color';
import incompleteData from './incomplete-data';
import reduceToElementsBelowFloating from '../dom/reduce-to-elements-below-floating';

/**
 * Determine if element B is an inline descendant of A
 * @private
 * @param {Element} node
 * @param {Element} descendant
 * @return {Boolean}
 */
function isInlineDescendant(node, descendant) {
  const CONTAINED_BY = Node.DOCUMENT_POSITION_CONTAINED_BY;
  // eslint-disable-next-line no-bitwise
  if (!(node.compareDocumentPosition(descendant) & CONTAINED_BY)) {
    return false;
  }
  const style = window.getComputedStyle(descendant);
  const display = style.getPropertyValue('display');
  if (!display.includes('inline')) {
    return false;
  }
  // IE needs this; It doesn't set display:block when position is set
  const position = style.getPropertyValue('position');
  return position === 'static';
}

/**
 * Determine if the element obscures / overlaps with the text
 * @private
 * @param {Number} elmIndex
 * @param {Array} elmStack
 * @param {Element} originalElm
 * @return {Number|undefined}
 */
function calculateObscuringElement(elmIndex, elmStack, originalElm) {
  // Reverse order, so that we can safely splice
  for (let i = elmIndex - 1; i >= 0; i--) {
    if (!isInlineDescendant(originalElm, elmStack[i])) {
      return true;
    }
    // Ignore inline descendants, for example:
    // <p>text <img></p>; We don't care about the <img> element,
    // since it does not overlap the text inside of <p>
    elmStack.splice(i, 1);
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

      // Put the html background as the lowest element
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
