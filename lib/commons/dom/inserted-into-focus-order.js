import isFocusable from './is-focusable';
import isNativelyFocusable from './is-natively-focusable';
import { parseTabindex, nodeLookup } from '../../core/utils';

/**
 * Determines if an element is in the focus order, but would not be if its
 * tabindex were unspecified.
 * @method insertedIntoFocusOrder
 * @memberof axe.commons.dom
 * @instance
 * @param {Element|VirtualNode} node
 * @return {Boolean} True if the element is in the focus order but wouldn't be
 * if its tabindex were removed. Else, false.
 */
export default function insertedIntoFocusOrder(node) {
  const { vNode } = nodeLookup(node);
  const tabIndex = parseTabindex(vNode.attr('tabindex'));

  // an element that has an invalid tabindex will return 0 or -1 based on
  // if it is natively focusable or not, which will always be false for this
  // check as NaN is not > 1
  // @see https://www.w3.org/TR/html51/editing.html#the-tabindex-attribute
  return tabIndex > -1 && isFocusable(node) && !isNativelyFocusable(node);
}
