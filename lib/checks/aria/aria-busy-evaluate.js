import { getAriaValue } from '../../commons/aria';

/**
 * Checks if element has aria-busy tag set to "true"
 *
 * @memberof checks
 * @return {Boolean} True if node has "aria-busy" attribute. False otherwise
 */
export default function ariaBusyEvaluate(node, options, virtualNode) {
  return getAriaValue(virtualNode, 'aria-busy')?.value === 'true';
}
