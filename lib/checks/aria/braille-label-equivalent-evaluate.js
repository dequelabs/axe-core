import { sanitize, accessibleTextVirtual } from '../../commons/text';

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
  const brailleLabel = virtualNode.attr('aria-braillelabel') ?? '';
  if (!brailleLabel.trim()) {
    return true;
  }
  try {
    return sanitize(accessibleTextVirtual(virtualNode)) !== '';
  } catch {
    return undefined;
  }
}
