import { requiredOwned, getRole } from '../commons/aria';

function ariaRequiredChildrenMatches(node, virtualNode) {
  const role = getRole(virtualNode);
  return !!requiredOwned(role);
}

export default ariaRequiredChildrenMatches;
