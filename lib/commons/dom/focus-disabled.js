import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';
import isHiddenWithCSS from './is-hidden-with-css';

/**
 * Determines if focusing has been disabled on an element.
 * @param {HTMLElement|VirtualNode} el The HTMLElement
 * @return {Boolean} Whether focusing has been disabled on an element.
 */
function focusDisabled(el) {
  const vNode = el instanceof AbstractVirtualNode ? el : getNodeFromTree(el);

  if (vNode.hasAttr('disabled')) {
    vNode._isDisabled = true;
    return true;
  }

  let parentNode = vNode.parent;
  while (parentNode) {
    // if a form element is in a legend, that element will not be disabled even if the fieldset is
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
    if (parentNode.props.nodeName === 'legend') {
      break;
    }

    if (
      parentNode.props.nodeName === 'fieldset' &&
      (parentNode._isDisabled || parentNode.hasAttr('disabled')) &&
      parentNode.shadowId === vNode.shadowId
    ) {
      return true;
    }
    parentNode = parentNode.parent;
  }

  if (vNode.props.nodeName !== 'area') {
    // if the virtual node does not have an actual node, treat it
    // as not hidden
    if (!vNode.actualNode) {
      vNode._isDisabled = false;
      return false;
    }
    const isDisabled = isHiddenWithCSS(vNode.actualNode);
    vNode._isDisabled = isDisabled;
    return isDisabled;
  }

  return false;
}

export default focusDisabled;
