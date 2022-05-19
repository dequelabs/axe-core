import {
  requiredOwned,
  getRole,
  getExplicitRole,
  getOwnedVirtual
} from '../../commons/aria';
import { hasContentVirtual, idrefs } from '../../commons/dom';

/**
 * Get all owned roles of an element
 */
function getOwnedRoles(virtualNode, required) {
  // DAISY-AXE
  const parentRole = getRole(virtualNode, { dpub: true });

  const ownedRoles = [];
  const ownedElements = getOwnedVirtual(virtualNode);
  for (let i = 0; i < ownedElements.length; i++) {
    const ownedElement = ownedElements[i];

    // DAISY-AXE
    const role = getRole(ownedElement, { noPresentational: true, dpub: true });
    // const role = getRole(ownedElement, { noPresentational: true });

    // if owned node has no role or is presentational, or if role
    // allows group or rowgroup, we keep parsing the descendant tree.
    // this means intermediate roles between a required parent and
    // child will fail the check
    if (
      !role ||
      (['group', 'rowgroup'].includes(role) &&
        required.some(requiredRole => requiredRole === role)) ||
      // DAISY-AXE
      (['list'].includes(role) &&
        ['doc-bibliography', 'doc-endnotes'].includes(parentRole))
    ) {
      ownedElements.push(...ownedElement.children);
    } else if (role) {
      ownedRoles.push(role);
    }
  }

  return ownedRoles;
}

/**
 * Get missing children roles
 */
function missingRequiredChildren(virtualNode, role, required, ownedRoles) {
  for (let i = 0; i < ownedRoles.length; i++) {
    var ownedRole = ownedRoles[i];

    if (required.includes(ownedRole)) {
      required = required.filter(requiredRole => requiredRole !== ownedRole);
      return null;
    }
  }

  if (required.length) {
    return required;
  }

  return null;
}

/**
 * Check that an element owns all required children for its explicit role.
 *
 * Required roles are taken from the `ariaRoles` standards object from the roles `requiredOwned` property.
 *
 * @memberof checks
 * @param {Boolean} options.reviewEmpty List of ARIA roles that should be flagged as "Needs Review" rather than a violation if the element has no owned children.
 * @data {String[]} List of all missing owned roles.
 * @returns {Mixed} True if the element owns all required roles. Undefined if `options.reviewEmpty=true` and the element has no owned children. False otherwise.
 */
function ariaRequiredChildrenEvaluate(node, options, virtualNode) {
  const reviewEmpty =
    options && Array.isArray(options.reviewEmpty) ? options.reviewEmpty : [];
  const role = getExplicitRole(virtualNode, { dpub: true });
  const required = requiredOwned(role);
  if (required === null) {
    return true;
  }

  const ownedRoles = getOwnedRoles(virtualNode, required);
  const missing = missingRequiredChildren(
    virtualNode,
    role,
    required,
    ownedRoles
  );
  if (!missing) {
    return true;
  }

  this.data(missing);

  // Only review empty nodes when a node is both empty and does not have an aria-owns relationship
  if (
    reviewEmpty.includes(role) &&
    !hasContentVirtual(virtualNode, false, true) &&
    !ownedRoles.length &&
    (!virtualNode.hasAttr('aria-owns') || !idrefs(node, 'aria-owns').length)
  ) {
    return undefined;
  }

  return false;
}

export default ariaRequiredChildrenEvaluate;
