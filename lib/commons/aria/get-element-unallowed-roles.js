import isValidRole from './is-valid-role';
import getImplicitRole from './implicit-role';
import getRoleType from './get-role-type';
import isAriaRoleAllowedOnElement from './is-aria-role-allowed-on-element';
import { tokenList, isHtmlElement, nodeLookup } from '../../core/utils';

// dpub roles which are subclassing roles that are implicit on some native
// HTML elements (img, link, etc.)
const dpubRoles = [
  'doc-backlink',
  'doc-biblioentry',
  'doc-biblioref',
  'doc-cover',
  'doc-endnote',
  'doc-glossref',
  'doc-noteref'
];

const landmarkRoles = {
  header: 'banner',
  footer: 'contentinfo'
};

/**
 * Returns all roles applicable to element in a list
 *
 * @method getRoleSegments
 * @private
 * @param {Element} node
 * @returns {Array} Roles list or empty list
 */

function getRoleSegments(vNode) {
  let roles = [];
  if (!vNode) {
    return roles;
  }

  if (vNode.hasAttr('role')) {
    const nodeRoles = tokenList(vNode.attr('role').toLowerCase());
    roles = roles.concat(nodeRoles);
  }

  // filter invalid roles
  return roles.filter(role => isValidRole(role));
}

/**
 * gets all unallowed roles for a given node
 * @method getElementUnallowedRoles
 * @param {Element|VirtualNode} node HTMLElement to validate
 * @param {String} allowImplicit option to allow implicit roles, defaults to true
 * @return {Array<String>} retruns an array of roles that are not allowed on the given node
 */
function getElementUnallowedRoles(node, allowImplicit = true) {
  const { vNode } = nodeLookup(node);
  // by pass custom elements
  if (!isHtmlElement(vNode)) {
    return [];
  }
  // allow landmark roles to use their implicit role inside another landmark
  // @see https://github.com/dequelabs/axe-core/pull/3142
  const { nodeName } = vNode.props;
  const implicitRole = getImplicitRole(vNode) || landmarkRoles[nodeName];

  const roleSegments = getRoleSegments(vNode);
  return roleSegments.filter(role => {
    return !roleIsAllowed(role, vNode, allowImplicit, implicitRole);
  });
}

function roleIsAllowed(role, vNode, allowImplicit, implicitRole) {
  if (allowImplicit && role === implicitRole) {
    return true;
  }
  // if role is a dpub role make sure it's used on an element with a valid
  // implicit role fallback
  if (dpubRoles.includes(role) && getRoleType(role) !== implicitRole) {
    return false;
  }
  // check if role is allowed on element
  return isAriaRoleAllowedOnElement(vNode, role);
}

export default getElementUnallowedRoles;
