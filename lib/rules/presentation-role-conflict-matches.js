import { getImplicitRole } from '../commons/aria';

function presentationRoleConflictMatches(node) {
  return getImplicitRole(node) !== null;
}

export default presentationRoleConflictMatches;
