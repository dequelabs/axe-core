import standards from '../../standards';
import { getRole } from '../../commons/aria';

/**
 * Check that an elements semantic role is deprecated.
 *
 * Deprecated roles are taken from the `ariaRoles` standards object from the roles `deprecated` property.
 *
 * @memberof checks
 * @return {Boolean} True if the elements semantic role is deprecated. False otherwise.
 */
export default function deprecatedroleEvaluate(node, options, virtualNode) {
  const role = getRole(virtualNode, { dpub: true, fallback: true });
  const roleDefinition = standards.ariaRoles[role];
  if (!roleDefinition?.deprecated) {
    return false;
  }

  this.data(role);
  return true;
}
