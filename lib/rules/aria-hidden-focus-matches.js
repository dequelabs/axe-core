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
  const ariaHidden = getAriaValue(vNode, 'aria-hidden', {
    lowercase: true
  })?.value;
  if (ariaHidden === 'true') {
    return false;
  }
  return shouldMatchElement(getComposedParent(el));
}

function ariaHiddenFocusMatches(node) {
  return shouldMatchElement(getComposedParent(node));
}

export default ariaHiddenFocusMatches;
