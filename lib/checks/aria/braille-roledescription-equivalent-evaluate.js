import { sanitize } from '../../commons/text';
import { getAriaValue } from '../../commons/aria';

/**
 * Check that if aria-brailleroledescription is not empty,
 * the element has a non-empty aria-roledescription
 * @memberof checks
 * @return {Boolean}
 */
export default function brailleRoleDescriptionEquivalentEvaluate(
  node,
  options,
  virtualNode
) {
  const brailleRoleDesc =
    getAriaValue(virtualNode, 'aria-brailleroledescription')?.value ?? '';
  if (sanitize(brailleRoleDesc) === '') {
    return true;
  }
  const roleDesc =
    getAriaValue(virtualNode, 'aria-roledescription')?.value ?? null;
  if (typeof roleDesc !== 'string') {
    this.data({ messageKey: 'noRoleDescription' });
    return false;
  }

  if (sanitize(roleDesc) === '') {
    this.data({ messageKey: 'emptyRoleDescription' });
    return false;
  }
  return true;
}
