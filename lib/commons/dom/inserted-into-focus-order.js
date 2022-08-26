import isInTabOrder from './is-in-tab-order';
import isNativelyFocusable from './is-natively-focusable';

/**
 * Determines if an element is in the focus order, but would not be if its
 * tabindex were unspecified.
 * @method insertedIntoFocusOrder
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} True if the element is in the focus order but wouldn't be
 * if its tabindex were removed. Else, false.
 */
function insertedIntoFocusOrder(el) {
  return isInTabOrder(el) && !isNativelyFocusable(el);
}

export default insertedIntoFocusOrder;
