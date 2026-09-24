import {
  requiredOwned,
  getRole,
  getExplicitRole,
  getOwnedVirtual,
  getAriaValue
} from '../../commons/aria';
import { getGlobalAriaAttrs } from '../../commons/standards';
import {
  hasContentVirtual,
  isFocusable,
  isVisibleToScreenReaders
} from '../../commons/dom';

const PRESENTATIONAL_ROLES = ['presentation', 'none'];

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
export default function ariaRequiredChildrenEvaluate(
  node,
  options,
  virtualNode
) {
  const reviewEmpty =
    options && Array.isArray(options.reviewEmpty) ? options.reviewEmpty : [];
  const explicitRole = getExplicitRole(virtualNode, { dpub: true });
  const required = requiredOwned(explicitRole);
  if (required === null) {
    return true;
  }

  const ownedRoles = getOwnedRoles(virtualNode, required);
  const unallowed = ownedRoles.filter(
    ({ role, vNode }) => vNode.props.nodeType === 1 && !required.includes(role)
  );

  if (unallowed.length) {
    this.relatedNodes(unallowed.map(({ vNode }) => vNode));
    let messageKey = 'unallowed';
    let selectors = unallowed.map(({ vNode, attr }) =>
      getUnallowedSelector(vNode, attr)
    );
    if (getAriaValue(virtualNode, 'aria-busy').value === 'true') {
      messageKey = 'aria-busy-fail';
    } else if (unallowed.every(isPresentationalConflict)) {
      // the children are only unallowed because an attribute stops their
      // presentational role from being applied
      messageKey = 'unallowedPresentational';
      selectors = unallowed.map(({ attr }) => `[${attr}]`);
    }

    this.data({
      messageKey,
      values: selectors
        .filter((selector, index, array) => array.indexOf(selector) === index)
        .join(', ')
    });
    return false;
  }

  if (hasRequiredChildren(required, ownedRoles)) {
    return true;
  }

  if (getAriaValue(virtualNode, 'aria-busy').value === 'true') {
    this.data({ messageKey: 'aria-busy' });
    return true;
  }

  this.data(required);

  // Only review empty nodes when a node is both empty and does not have an aria-owns relationship
  if (reviewEmpty.includes(explicitRole) && !ownedRoles.some(isContent)) {
    return undefined;
  }

  return false;
}

/**
 * Get all owned roles of an element
 */
function getOwnedRoles(virtualNode, required) {
  let vNode;
  const ownedRoles = [];
  const ownedVirtual = getOwnedVirtual(virtualNode);
  while ((vNode = ownedVirtual.shift())) {
    if (vNode.props.nodeType === 3) {
      ownedRoles.push({ vNode, role: null });
    }
    if (vNode.props.nodeType !== 1 || !isVisibleToScreenReaders(vNode)) {
      continue;
    }

    const role = getRole(vNode, { noPresentational: true });
    const globalAriaAttr = getGlobalAriaAttr(vNode);
    const hasGlobalAriaOrFocusable = !!globalAriaAttr || isFocusable(vNode);

    // if owned node has no role or is presentational, or if role
    // allows group or rowgroup, we keep parsing the descendant tree.
    // this means intermediate roles between a required parent and
    // child will fail the check
    if (
      (!role && !hasGlobalAriaOrFocusable) ||
      (['group', 'rowgroup'].includes(role) &&
        required.some(requiredRole => requiredRole === role))
    ) {
      ownedVirtual.push(...vNode.children);
    } else if (role || hasGlobalAriaOrFocusable) {
      const attr =
        globalAriaAttr || (vNode.hasAttr('tabindex') ? 'tabindex' : undefined);
      ownedRoles.push({ role, attr, vNode });
    }
  }

  return ownedRoles;
}

/**
 * See if any required roles are in the ownedRoles array
 */
function hasRequiredChildren(required, ownedRoles) {
  return ownedRoles.some(({ role }) => role && required.includes(role));
}

/**
 * Get the first global ARIA attribute the element has.
 * @param {VirtualNode} vNode
 * @return {String|null}
 */
function getGlobalAriaAttr(vNode) {
  return getGlobalAriaAttrs().find(attr => vNode.hasAttr(attr));
}

/**
 * Check if an owned element has a presentational role that is ignored because
 * of a global ARIA attribute or tabindex
 * @param {Object} ownedRole
 * @param {VirtualNode} ownedRole.vNode
 * @param {String} [ownedRole.attr] - Attribute which made the element unallowed
 * @return {Boolean}
 */
function isPresentationalConflict({ vNode, attr }) {
  return !!attr && PRESENTATIONAL_ROLES.includes(getExplicitRole(vNode));
}

/**
 * Return a simple selector for an unallowed element.
 * @param {VirtualNode} vNode
 * @param {String} [attr] - Optional attribute which made the element unallowed
 * @return {String}
 */
function getUnallowedSelector(vNode, attr) {
  const { nodeName, nodeType } = vNode.props;
  if (nodeType === 3) {
    return `#text`;
  }

  const role = getExplicitRole(vNode, { dpub: true });
  if (role && isPresentationalConflict({ vNode, attr })) {
    return `[role=${role}][${attr}]`;
  }
  if (role) {
    return `[role=${role}]`;
  }
  if (attr) {
    return nodeName + `[${attr}]`;
  }
  return nodeName;
}

/**
 * Check if the node has content, or is itself content
 * @Object {Object} OwnedRole
 * @property {VirtualNode} vNode
 * @returns {Boolean}
 */
function isContent({ vNode }) {
  if (vNode.props.nodeType === 3) {
    return vNode.props.nodeValue.trim().length > 0;
  }
  return hasContentVirtual(vNode, false, true);
}
