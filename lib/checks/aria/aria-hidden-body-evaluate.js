import { getAriaValue } from '../../commons/aria';

/**
 * Check that the element does not have the `aria-hidden` attribute.
 *
 * @memberof checks
 * @return {Boolean} True if the `aria-hidden` attribute is not present. False otherwise.
 */
function ariaHiddenBodyEvaluate(node, options, virtualNode) {
  return (
    getAriaValue(virtualNode, 'aria-hidden', { lowercase: true })?.value !==
    'true'
  );
}

export default ariaHiddenBodyEvaluate;
