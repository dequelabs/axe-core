import { getExplicitRole, getRole, requiredContext } from '../../commons/aria';
import { getRootNode } from '../../commons/dom';
import { getNodeFromTree, escapeSelector } from '../../core/utils';

function getMissingContext(
  virtualNode,
  ownGroupRoles,
  reqContext,
  includeElement
) {
  const explicitRole = getExplicitRole(virtualNode);

  if (!reqContext) {
    reqContext = requiredContext(explicitRole);
  }

  if (!reqContext) {
    return null;
  }

  const allowsGroup = reqContext.includes('group');
  let vNode = includeElement ? virtualNode : virtualNode.parent;

  while (vNode) {
    const role = getRole(vNode, { noPresentational: true });

    // if parent node has no role or is presentational, or if role
    // allows group, we keep parsing the parent tree.
    // this means intermediate roles between a required parent and
    // child will fail the check
    if (!role) {
      vNode = vNode.parent;
    } else if (role === 'group' && allowsGroup) {
      // Allow the own role; i.e. tree > treeitem > group > treeitem
      if (ownGroupRoles.includes(explicitRole)) {
        reqContext.push(explicitRole);
      }
      reqContext = reqContext.filter(r => r !== 'group');
      vNode = vNode.parent;
    } else if (reqContext.includes(role)) {
      return null;
    } else {
      return reqContext;
    }
  }

  return reqContext;
}

function getAriaOwners(element) {
  const owners = [];
  let o = null;

  while (element) {
    if (element.getAttribute('id')) {
      const id = escapeSelector(element.getAttribute('id'));
      const doc = getRootNode(element);
      o = doc.querySelector(`[aria-owns~=${id}]`);
      if (o) {
        owners.push(o);
      }
    }
    element = element.parentElement;
  }

  return owners.length ? owners : null;
}

/**
 * Check if the element has a parent with a required role.
 *
 * Required parent roles are taken from the `ariaRoles` standards object from the roles `requiredContext` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all missing required parent roles</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element has a parent with a required role. False otherwise.
 */
function ariaRequiredParentEvaluate(node, options, virtualNode) {
  const ownGroupRoles =
    options && Array.isArray(options.ownGroupRoles)
      ? options.ownGroupRoles
      : [];
  let missingParents = getMissingContext(virtualNode, ownGroupRoles);

  if (!missingParents) {
    return true;
  }
  const owners = getAriaOwners(node);
  if (owners) {
    for (let i = 0, l = owners.length; i < l; i++) {
      missingParents = getMissingContext(
        getNodeFromTree(owners[i]),
        ownGroupRoles,
        missingParents,
        true
      );
      if (!missingParents) {
        return true;
      }
    }
  }

  this.data(missingParents);
  return false;
}

export default ariaRequiredParentEvaluate;
