import standards from '../../standards';
import { getRole } from '../../commons/aria';

/**
 * Check that an element does not use a role that is not recommended.
 *
 * Not recommended roles are taken from the `ariaRoles` standards object from
 * the role's `notRecommended` property.
 *
 * @memberof checks
 * @return {Boolean|undefined} True if the element's semantic role is
 * recommended, undefined (needs review) if it is not recommended.
 */
export default function notRecommendedRoleEvaluate(node, options, virtualNode) {
  const role = getRole(virtualNode, { dpub: true, fallback: true });
  if (!standards.ariaRoles[role]?.notRecommended) {
    return true;
  }

  this.data(role);
  // Not recommended roles are still valid, so this is a needs-review rather
  // than a violation.
  return undefined;
}
