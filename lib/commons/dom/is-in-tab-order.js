import { nodeLookup } from '../../core/utils';
import isFocusable from './is-focusable';

/**
 * Determines if an element is focusable and able to be tabbed to.
 * @method isInTabOrder
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} The element's tabindex status
 */
export default function isInTabOrder(el) {
  const { vNode } = nodeLookup(el);

  if (vNode.props.nodeType !== 1) {
    return false;
  }

  const tabindex = parseInt(vNode.attr('tabindex', 10));
  if (tabindex <= -1) {
    return false; // Elements with tabindex=-1 are never in the tab order
  }

  return isFocusable(vNode);
}
