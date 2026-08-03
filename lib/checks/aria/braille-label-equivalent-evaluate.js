import { sanitize, accessibleTextVirtual } from '../../commons/text';
import { getAriaValue } from '../../commons/aria';

/**
 * Check that if aria-braillelabel is not empty, the element has an accessible text
 * @memberof checks
 * @return {Boolean}
 */
export default function brailleLabelEquivalentEvaluate(
  node,
  options,
  virtualNode
) {
  const brailleLabel =
    getAriaValue(virtualNode, 'aria-braillelabel')?.value ?? '';
  if (!brailleLabel.trim()) {
    return true;
  }
  try {
    return sanitize(accessibleTextVirtual(virtualNode)) !== '';
  } catch {
    return undefined;
  }
}
