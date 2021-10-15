import isValidRole from './is-valid-role';
import getImplicitRole from './implicit-role';
import getRoleType from './get-role-type';
import isAriaRoleAllowedOnElement from './is-aria-role-allowed-on-element';
import {
  tokenList,
  isHtmlElement,
  matchesSelector,
  getNodeFromTree
} from '../../core/utils';
import AbstractVirtuaNode from '../../core/base/virtual-node/abstract-virtual-node';

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
  header: 'banner'
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
  roles = roles.filter(role => isValidRole(role));

  return roles;
}

/**
 * gets all unallowed roles for a given node
 * @method getElementUnallowedRoles
 * @param {Element|VirtualNode} node HTMLElement to validate
 * @param {String} allowImplicit option to allow implicit roles, defaults to true
 * @return {Array<String>} retruns an array of roles that are not allowed on the given node
 */
function getElementUnallowedRoles(node, allowImplicit = true) {
  const vNode =
    node instanceof AbstractVirtuaNode ? node : getNodeFromTree(node);
  const { nodeName } = vNode.props;

  // by pass custom elements
  if (!isHtmlElement(vNode)) {
    return [];
  }

  const roleSegments = getRoleSegments(vNode);
  const implicitRole = getImplicitRole(vNode);

  // stores all roles that are not allowed for a specific element most often an element only has one explicit role
  const unallowedRoles = roleSegments.filter(role => {
    // if role and implicit role are same, when allowImplicit: true
    // ignore as it is a redundant role
    if (allowImplicit && role === implicitRole) {
      return false;
    }

    // if role is a dpub role make sure it's used on an element with a valid
    // implicit role fallback
    if (allowImplicit && dpubRoles.includes(role)) {
      const roleType = getRoleType(role);
      if (implicitRole !== roleType) {
        return true;
      }
    }

    // by adding the 'banner' role landmark to the header elm (allowed-roles html-elms.js)
    // @see https://github.com/dequelabs/axe-core/issues/3108
    // it does not fail aria-allowed-roles when the user sets allowImplicit
    // we need a check to see if the role is present on a header elm and allowImplicit=false
    if (!allowImplicit && landmarkRoles[nodeName] === role) {
      return true;
    }

    // Edge case:
    // setting implicit role row on tr element is allowed when child of table[role='grid'] and table
    if (
      !allowImplicit &&
      role === implicitRole &&
      !(
        matchesSelector(vNode, 'table[role="grid"] > tr') &&
        nodeName === 'tr' &&
        role === 'row'
      )
    ) {
      return true;
    }

    // check if role is allowed on element
    return !isAriaRoleAllowedOnElement(vNode, role);
  });

  return unallowedRoles;
}

export default getElementUnallowedRoles;
