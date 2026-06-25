import getResolvedRefs from '../dom/get-resolved-refs';
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
  let candidate;

  candidate = getResolvedRefs(virtualNode, 'aria-labelledby')
    .map(ref => (ref ? visibleVirtual(ref) : ''))
    .join(' ')
    .trim();

  if (candidate) {
    return candidate;
  }

  // aria-label
  candidate = virtualNode.attr('aria-label');
  if (candidate) {
    candidate = sanitize(candidate);
    if (candidate) {
      return candidate;
    }
  }

  return null;
}
export default labelVirtual;
