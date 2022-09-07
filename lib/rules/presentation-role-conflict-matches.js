import { getImplicitRole } from '../commons/aria';

/**
 * @deprecated Will be removed in axe-core 5.0.0
 */
function presentationRoleConflictMatches(node, virtualNode) {
  return getImplicitRole(virtualNode, { chromiumRoles: true }) !== null;
}

export default presentationRoleConflictMatches;
