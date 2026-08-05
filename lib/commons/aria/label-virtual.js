import hasAriaValue from './has-aria-value';
import getResolvedRefs from '../dom/get-resolved-refs';
import getAriaValue from './get-aria-value';
import visibleVirtual from '../text/visible-virtual';
import sanitize from '../text/sanitize';

/**
 * Gets the accessible ARIA label text of a given element
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @method labelVirtual
 * @memberof axe.commons.aria
 * @instance
 * @param  {VirtualNode} virtualNode The virtualNode to test
 * @return {Mixed}  String of visible text, or `null` if no label is found
 */
function labelVirtual(virtualNode) {
  let ref, candidate;

  if (hasAriaValue(virtualNode, 'aria-labelledby')) {
    // aria-labelledby
    ref = getResolvedRefs(virtualNode, 'aria-labelledby');
    candidate = ref
      .map(vNode => {
        return vNode ? visibleVirtual(vNode) : '';
      })
      .join(' ')
      .trim();

    if (candidate) {
      return candidate;
    }
  }

  // aria-label
  candidate = getAriaValue(virtualNode, 'aria-label').value;
  if (candidate) {
    candidate = sanitize(candidate);
    if (candidate) {
      return candidate;
    }
  }

  return null;
}

export default labelVirtual;
