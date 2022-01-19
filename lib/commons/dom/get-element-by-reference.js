import isCurrentPageLink from './is-current-page-link';

/**
 * Returns a reference to the element matching the attr URL fragment value
 * @method getElementByReference
 * @memberof axe.commons.dom
 * @instance
 * @param {Element} node
 * @param {String} attr Attribute name (href)
 * @return {Element}
 */
function getElementByReference(node, attr) {
  let fragment = node.getAttribute(attr);
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

export default getElementByReference;
