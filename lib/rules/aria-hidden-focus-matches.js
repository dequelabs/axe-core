import { getAriaValue } from '../commons/aria';

/**
 * Only match the outer-most `aria-hidden=true` element
 * @return {Boolean}
 */
function ariaHiddenFocusMatches(node, virtualNode) {
  let vNode = virtualNode.parent;
  while (vNode) {
    const ariaHidden = getAriaValue(vNode, 'aria-hidden', {
      lowercase: true
    })?.value;
    if (ariaHidden === 'true') {
      return false;
    }

    vNode = vNode.parent;
  }

  return true;
}

export default ariaHiddenFocusMatches;
