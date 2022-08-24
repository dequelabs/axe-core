import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';
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
  const vNode = el instanceof AbstractVirtualNode ? el : getNodeFromTree(el);

  if (vNode.props.nodeType !== 1) {
    return false;
  }

  var focusable = isFocusable(vNode);
  var tabindex = vNode.attr('tabindex');

  if (focusable && tabindex && parseInt(tabindex, 10) >= 0) {
    return true;
  } else if (focusable && isNaN(parseInt(tabindex, 10))) {
    return true;
  }

  return false;
}
