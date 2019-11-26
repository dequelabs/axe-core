import { getRole } from '../commons/aria';

function ariaAllowedRoleMatches(node, virtualNode, context) {
  return (
  	getRole(node, {
  		noImplicit: true,
  		dpub: true,
  		fallback: true
  	}) !== null
  );
}

export default ariaAllowedRoleMatches;