import standards from '../../standards';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { nodeLookup } from '../../core/utils';
import memoize from '../../core/utils/memoize';

/**
 * Get the "type" of role; either widget, composite, abstract, landmark or `null`
 * @method getRoleType
 * @memberof axe.commons.aria
 * @instance
 * @param {String|Null|Node|Element} role The role to check, or element to check the role of
 * @return {Mixed} String if a matching role and its type are found, otherwise `null`
 */
function getRoleType(role) {
  if (
    role instanceof AbstractVirtualNode ||
    (window?.Node && role instanceof window.Node)
  ) {
    // Resolving the role of a node is the expensive half of this, and the same
    // node is asked for its role type repeatedly during a run. Memoize on the
    // virtual node rather than on `role` itself: memoizee's primitive mode
    // keys off `String(argument)`, and only a virtual node has a unique string
    // form — every span element stringifies to `[object HTMLSpanElement]`.
    const { vNode } = nodeLookup(role);
    return vNode
      ? getRoleTypeVirtual(vNode)
      : roleTypeOf(axe.commons.aria.getRole(role));
  }

  return roleTypeOf(role);
}

const getRoleTypeVirtual = memoize(
  function getRoleTypeMemoized(vNode) {
    return roleTypeOf(axe.commons.aria.getRole(vNode));
  },
  { primitive: true }
);

function roleTypeOf(role) {
  const roleDef = standards.ariaRoles[role];
  return roleDef?.type || null;
}

export default getRoleType;
