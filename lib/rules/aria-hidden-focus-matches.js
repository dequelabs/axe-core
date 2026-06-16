import { getComposedParent } from '../commons/dom';
import { getAriaValue } from '../commons/aria';
import { getNodeFromTree } from '../core/utils';

/**
 * Only match the outer-most `aria-hidden=true` element
 * @param {HTMLElement} el the HTMLElement to verify
 * @return {Boolean}
 */
function shouldMatchElement(el) {
  if (!el) {
    return true;
  }

  const vNode = getNodeFromTree(el);

  // the composed parent could or could not be included in the tree so we'll need to handle either case
  const ariaHidden = vNode
    ? getAriaValue(vNode, 'aria-hidden', { lowercase: true })?.value
    : el.getAttribute('aria-hidden');
  if (ariaHidden === 'true') {
    return false;
  }
  return shouldMatchElement(getComposedParent(el));
}

function ariaHiddenFocusMatches(node) {
  return shouldMatchElement(getComposedParent(node));
}

export default ariaHiddenFocusMatches;
