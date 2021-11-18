import { getNodeFromTree } from '../../core/utils';
import AbstractVirtuaNode from '../../core/base/virtual-node/abstract-virtual-node';
import getImplicitRole from './implicit-role';
import getElementSpec from '../standards/get-element-spec';

/**
 * @description validate if a given role is an allowed ARIA role for the supplied node
 * @method isAriaRoleAllowedOnElement
 * @param {HTMLElement} node the node to verify
 * @param {String} role aria role to check
 * @return {Boolean} retruns true/false
 */
function isAriaRoleAllowedOnElement(node, role) {
  const vNode =
    node instanceof AbstractVirtuaNode ? node : getNodeFromTree(node);
  const implicitRole = getImplicitRole(vNode);

  const spec = getElementSpec(vNode);

  if (Array.isArray(spec.allowedRoles)) {
    return spec.allowedRoles.includes(role);
  }

  // By default, ARIA in HTML does not allow implicit roles to be the same as explicit ones
  // aria-allowed-roles has an `allowedImplicit` option to bypass this.
  if (role === implicitRole) {
    return false;
  }
  return !!spec.allowedRoles;
}

export default isAriaRoleAllowedOnElement;
