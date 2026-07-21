import { getAriaValue } from '../commons/aria';

/**
 * Only match the outer-most `aria-hidden=true` element
 * @return {Boolean}
 */
export default function ariaHiddenFocusMatches(node, virtualNode) {
  let vNode = virtualNode.parent;
  while (vNode) {
    const ariaHidden = getAriaValue(vNode, 'aria-hidden').value;
    if (ariaHidden === 'true') {
      return false;
    }

    vNode = vNode.parent;
  }

  return true;
}
