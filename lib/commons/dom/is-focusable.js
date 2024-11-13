import focusDisabled from './focus-disabled';
import isNativelyFocusable from './is-natively-focusable';
import { nodeLookup } from '../../core/utils';
import { parseTabindex } from '../../core/utils';

/**
 * Determines if an element is keyboard or programmatically focusable.
 * @method isFocusable
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} The element's focusability status
 */
export default function isFocusable(el) {
  const { vNode } = nodeLookup(el);

  if (vNode.props.nodeType !== 1) {
    return false;
  }

  if (focusDisabled(vNode)) {
    return false;
  } else if (isNativelyFocusable(vNode)) {
    return true;
  }
  // check if the tabindex is specified and a parseable number
  const tabindex = parseTabindex(vNode.attr('tabindex'));
  return tabindex !== null;
}
