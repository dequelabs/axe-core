import { tokenList } from '../../core/utils';
import { getImplicitRole } from '../../commons/aria';

/**
 * NOTE: This check is no longer used, but it was not deprecated
 * so it can be used in custom rulesets.
 * @return {Boolean} True if the element has no implicit role and uses both none and presentation as explicit roles
 */
function nonePresentationOnElementWithNoImplicitRole(
  virtualNode,
  explicitRoles
) {
  const hasImplicitRole = getImplicitRole(virtualNode);
  return (
    !hasImplicitRole &&
    explicitRoles.length === 2 &&
    explicitRoles.includes('none') &&
    explicitRoles.includes('presentation')
  );
}
/**
 * Check that an element does not use more than one explicit role.
 *
 * @memberof checks
 * @return {Boolean} True if the element uses more than one explicit role. False otherwise.
 */
function fallbackroleEvaluate(node, options, virtualNode) {
  const explicitRoles = tokenList(virtualNode.attr('role'));
  if (explicitRoles.length <= 1) {
    return false;
  }
  return nonePresentationOnElementWithNoImplicitRole(virtualNode, explicitRoles)
    ? undefined
    : true;
}

export default fallbackroleEvaluate;
