import {
  requiredOwned,
  getRole,
  getExplicitRole,
  getOwnedVirtual
} from '../../commons/aria';
import { getGlobalAriaAttrs } from '../../commons/standards';
import {
  hasContentVirtual,
  isFocusable,
  isVisibleToScreenReaders
} from '../../commons/dom';

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
  const role = getExplicitRole(virtualNode, { dpub: true });
  const required = requiredOwned(role);
  if (required === null) {
    return true;
  }

  const { ownedRoles, ownedElements } = getOwnedRoles(virtualNode, required);
  const unallowed = ownedRoles.filter(({ role }) => !required.includes(role));

  if (unallowed.length) {
    this.relatedNodes(unallowed.map(({ ownedElement }) => ownedElement));
    this.data({
      messageKey: 'unallowed',
      values: unallowed
        .map(({ ownedElement, attr }) =>
          getUnallowedSelector(ownedElement, attr)
        )
        .filter((selector, index, array) => array.indexOf(selector) === index)
        .join(', ')
    });
    return false;
  }

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
  if (reviewEmpty.includes(role) && !ownedElements.some(isContent)) {
    return undefined;
  }

  return false;
}

/**
 * Get all owned roles of an element
 */
function getOwnedRoles(virtualNode, required) {
  const ownedRoles = [];
  const ownedElements = getOwnedVirtual(virtualNode).filter(vNode => {
    return vNode.props.nodeType !== 1 || isVisibleToScreenReaders(vNode);
  });

  for (let i = 0; i < ownedElements.length; i++) {
    const ownedElement = ownedElements[i];
    if (ownedElement.props.nodeType !== 1) {
      continue;
    }

    const role = getRole(ownedElement, { noPresentational: true });

    const globalAriaAttr = getGlobalAriaAttr(ownedElement);
    const hasGlobalAriaOrFocusable =
      !!globalAriaAttr || isFocusable(ownedElement);

    // if owned node has no role or is presentational, or if role
    // allows group or rowgroup, we keep parsing the descendant tree.
    // this means intermediate roles between a required parent and
    // child will fail the check
    if (
      (!role && !hasGlobalAriaOrFocusable) ||
      (['group', 'rowgroup'].includes(role) &&
        required.some(requiredRole => requiredRole === role))
    ) {
      ownedElements.push(...ownedElement.children);
    } else if (role || hasGlobalAriaOrFocusable) {
      ownedRoles.push({
        role,
        attr: globalAriaAttr || 'tabindex',
        ownedElement
      });
    }
  }

  return { ownedRoles, ownedElements };
}

/**
 * Get missing children roles
 */
function missingRequiredChildren(virtualNode, role, required, ownedRoles) {
  for (let i = 0; i < ownedRoles.length; i++) {
    const { role } = ownedRoles[i];

    if (required.includes(role)) {
      required = required.filter(requiredRole => requiredRole !== role);
      return null;
    }
  }

  if (required.length) {
    return required;
  }

  return null;
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
 * @param {VirtualNode} vNode
 * @returns {Boolean}
 */
function isContent(vNode) {
  if (vNode.props.nodeType === 3) {
    return vNode.props.nodeValue.trim().length > 0;
  }
  return hasContentVirtual(vNode, false, true);
}
