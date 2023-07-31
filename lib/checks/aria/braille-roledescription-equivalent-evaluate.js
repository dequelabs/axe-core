import { sanitize } from '../../commons/text';

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
  const brailleRoleDesc = virtualNode.attr('aria-brailleroledescription') ?? '';
  if (sanitize(brailleRoleDesc) === '') {
    return true;
  }
  const roleDesc = virtualNode.attr('aria-roledescription');
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
