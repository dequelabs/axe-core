import standards from '../../standards';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { nodeLookup } from '../../core/utils';

/**
 * Get the "type" of role; either widget, composite, abstract, landmark or `null`
 * @method getRoleType
 * @memberof axe.commons.aria
 * @instance
 * @param {String|Null|Node|Element} role The role to check, or element to check the role of
 * @return {Mixed} String if a matching role and its type are found, otherwise `null`
 */
function getRoleType(role) {
  if (!(
    role instanceof AbstractVirtualNode ||
    (window?.Node && role instanceof window.Node)
  )) {
    return roleTypeOf(role);
  }

  // resolving the role of a node is the expensive half of this, and the same
  // node is asked for its role type repeatedly during a run, so cache it on
  // the node. Written after resolving, so a throw is not cached.
  const { vNode } = nodeLookup(role);
  const nodeCache = vNode?._cache;
  if (nodeCache && 'getRoleType' in nodeCache) {
    return nodeCache.getRoleType;
  }

  const roleType = roleTypeOf(axe.commons.aria.getRole(role));
  if (nodeCache) {
    nodeCache.getRoleType = roleType;
  }
  return roleType;
}

function roleTypeOf(role) {
  const roleDef = standards.ariaRoles[role];
  return roleDef?.type || null;
}

export default getRoleType;
