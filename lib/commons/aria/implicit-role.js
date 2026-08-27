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

  // getRole is not cached, so every caller asking a node for its role asks
  // that node for its implicit role again. Some of those answers are costly:
  // header and footer walk their ancestors, form, section and aside compute an
  // accessible name. Cache per node, keyed on whether chromium roles are
  // included, since that changes the answer.
  const cacheKey = chromium ? 'implicitRoleChromium' : 'implicitRole';
  // SerialVirtualNode has no cache to read or write
  const nodeCache = vNode._cache;
  if (nodeCache && cacheKey in nodeCache) {
    return nodeCache[cacheKey];
  }

  const role = resolveImplicitRole(vNode, chromium);
  if (nodeCache) {
    // written after resolving, so a throw is never cached
    nodeCache[cacheKey] = role;
  }
  return role;
}

function resolveImplicitRole(vNode, chromium) {
  if (vNode.elementInternals?.role) {
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
