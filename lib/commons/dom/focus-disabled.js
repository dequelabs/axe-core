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
    return true;
  }

  // if a form element is in a legend, that element will not be disabled even if the fieldset is
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
  let parentNode = vNode.parent;
  const ancestors = [];
  let fieldsetDisabled = false;
  while (parentNode && !fieldsetDisabled) {
    ancestors.push(parentNode);
    if (parentNode.props.nodeName === 'legend') {
      break;
    }

    // use the cached value if one exists and it's from the same shadow tree
    if (
      parentNode._inDisabledFieldset !== undefined &&
      parentNode.shadowId === vNode.shadowId
    ) {
      fieldsetDisabled = parentNode._inDisabledFieldset;
    }

    if (
      parentNode.props.nodeName === 'fieldset' &&
      parentNode.hasAttr('disabled') &&
      parentNode.shadowId === vNode.shadowId
    ) {
      vNode._inDisabledFieldset = true;
    }
    parentNode = parentNode.parent;
  }

  // cache whether each element turned out to be in a disabled fieldset so we only have to look at each element once
  ancestors.forEach(
    ancestor => (ancestor._inDisabledFieldset = fieldsetDisabled)
  );
  if (fieldsetDisabled) {
    return true;
  }

  if (vNode.props.nodeName !== 'area') {
    // if the virtual node does not have an actual node, treat it
    // as not hidden
    if (!vNode.actualNode) {
      return false;
    }
    return isHiddenWithCSS(vNode.actualNode);
  }

  return false;
}

export default focusDisabled;
