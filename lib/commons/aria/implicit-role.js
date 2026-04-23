import implicitHtmlRoles from '../standards/implicit-html-roles';
import { nodeLookup } from '../../core/utils';
import getElementSpec from '../standards/get-element-spec';

/**
 * Get the implicit role for a given node
 * @method implicitRole
 * @memberof axe.commons.aria
 * @instance
 * @param {HTMLElement|VirtualNode} node The node to test
 * @return {Mixed} Either the role or `null` if there is none
 */
function implicitRole(node, { chromium } = {}) {
  const { vNode } = nodeLookup(node);

  // this error is only thrown if the virtual tree is not a
  // complete tree, which only happens in certain scenarios,
  // such as if a user used `getFlattenedTree` manually on a
  // subset of the DOM tree
  if (!vNode) {
    throw new ReferenceError(
      'Cannot get implicit role of a node outside the current scope.'
    );
  }

  if (vNode.elementInternals && vNode.elementInternals.role) {
    return vNode.elementInternals.role;
  }

  const nodeName = vNode.props.nodeName;
  const role = implicitHtmlRoles[nodeName];

  if (!role && chromium) {
    const { chromiumRole } = getElementSpec(vNode);
    return chromiumRole || null;
  }

  if (typeof role === 'function') {
    return role(vNode);
  }

  return role || null;
}

export default implicitRole;
