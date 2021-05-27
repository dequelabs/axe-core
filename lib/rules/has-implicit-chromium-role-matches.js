import { getImplicitRole } from '../commons/aria';

function hasImplicitChromiumRoleMatches(node, virtualNode) {
  return getImplicitRole(virtualNode) !== null;
}

export default hasImplicitChromiumRoleMatches;
