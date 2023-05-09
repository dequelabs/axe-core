import { nodeLookup } from '../../core/utils';
import isHiddenForEveryone from './is-hidden-for-everyone';
import isInert from './is-inert';

// Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
const allowedDisabledNodeNames = [
  'button',
  'command',
  'fieldset',
  'keygen',
  'optgroup',
  'option',
  'select',
  'textarea',
  'input'
];

function isDisabledAttrAllowed(nodeName) {
  return allowedDisabledNodeNames.includes(nodeName);
}

/**
 * Determines if focusing has been disabled on an element.
 * @param {HTMLElement|VirtualNode} el The HTMLElement
 * @return {Boolean} Whether focusing has been disabled on an element.
 */
function focusDisabled(el) {
  const { vNode } = nodeLookup(el);

  if (
    (isDisabledAttrAllowed(vNode.props.nodeName) &&
      vNode.hasAttr('disabled')) ||
    isInert(vNode)
  ) {
    return true;
  }

  // if a form element is in a legend, that element will not be disabled even if the fieldset is
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
  let parentNode = vNode.parent;
  const ancestors = [];
  let fieldsetDisabled = false;
  while (
    parentNode &&
    parentNode.shadowId === vNode.shadowId &&
    !fieldsetDisabled
  ) {
    ancestors.push(parentNode);
    if (parentNode.props.nodeName === 'legend') {
      break;
    }

    // use the cached value if one exists and it's from the same shadow tree
    if (parentNode._inDisabledFieldset !== undefined) {
      fieldsetDisabled = parentNode._inDisabledFieldset;
      break;
    }

    if (
      parentNode.props.nodeName === 'fieldset' &&
      parentNode.hasAttr('disabled')
    ) {
      fieldsetDisabled = true;
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
    return isHiddenForEveryone(vNode);
  }

  return false;
}

export default focusDisabled;
