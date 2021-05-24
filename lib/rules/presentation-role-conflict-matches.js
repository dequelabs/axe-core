import { getImplicitRole } from '../commons/aria';

function presentationRoleConflictMatches(node, virtualNode) {
  return getImplicitRole(virtualNode) !== null;
}

export default presentationRoleConflictMatches;
