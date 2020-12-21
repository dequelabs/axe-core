import { requiredContext, getExplicitRole } from '../commons/aria';

function ariaRequiredParentMatches(node, virtualNode) {
  const role = getExplicitRole(virtualNode, { dpub: true });
  return !!requiredContext(role);
}

export default ariaRequiredParentMatches;
