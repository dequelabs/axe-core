import { getExplicitRole } from '../commons/aria';

function ariaAllowedRoleMatches(node, virtualNode) {
  return (
    getExplicitRole(virtualNode, {
      dpub: true,
      fallback: true
    }) !== null
  );
}

export default ariaAllowedRoleMatches;
