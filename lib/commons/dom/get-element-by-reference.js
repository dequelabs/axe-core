import isCurrentPageLink from './is-current-page-link';
import { nodeLookup } from '../../core/utils';

/**
 * Returns a reference to the element matching the attr URL fragment value
 * @method getElementByReference
 * @memberof axe.commons.dom
 * @instance
 * @param {Element|VirtualNode} node
 * @param {String} attr Attribute name (href)
 * @return {Element}
 */
export default function getElementByReference(node, attr) {
  const { vNode } = nodeLookup(node);
  let fragment = vNode.attr(attr);
  if (!fragment) {
    return null;
  }

  if (attr === 'href' && !isCurrentPageLink(node)) {
    return null;
  }

  if (fragment.indexOf('#') !== -1) {
    fragment = decodeURIComponent(fragment.substr(fragment.indexOf('#') + 1));
  }

  let candidate = document.getElementById(fragment);
  if (candidate) {
    return candidate;
  }

  candidate = document.getElementsByName(fragment);
  if (candidate.length) {
    return candidate[0];
  }
  return null;
}
