import { getExplicitRole, getRole, requiredContext } from '../../commons/aria';
import { getGlobalAriaAttrs } from '../../commons/standards';
import { getRootNode, isNativelyFocusable } from '../../commons/dom';
import { getNodeFromTree, escapeSelector } from '../../core/utils';

const PRESENTATIONAL_ROLES = ['presentation', 'none'];

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
      return { missingParents: reqContext, ancestor: vNode };
    }
  }

  return { missingParents: reqContext };
}

/**
 * Get the attribute that stops the presentational role of an ancestor from
 * being applied. A natively focusable element is ignored, since removing the
 * attribute would not make its role apply
 * @param {VirtualNode} [vNode]
 * @return {String|undefined}
 */
function getPresentationalConflictAttr(vNode) {
  if (
    !vNode ||
    isNativelyFocusable(vNode) ||
    !PRESENTATIONAL_ROLES.includes(getExplicitRole(vNode))
  ) {
    return;
  }

  const globalAriaAttr = getGlobalAriaAttrs().find(attr => vNode.hasAttr(attr));
  return globalAriaAttr || (vNode.hasAttr('tabindex') ? 'tabindex' : undefined);
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
 * When the closest ancestor with a role has a `presentation` or `none` role
 * which is ignored because of a global ARIA attribute or `tabindex`, the data
 * is an object with `messageKey: 'presentationalConflict'`, the missing roles
 * as `values`, and the attribute as `attr`.
 *
 * @memberof checks
 * @return {Boolean} True if the element has a parent with a required role. False otherwise.
 */
function ariaRequiredParentEvaluate(node, options, virtualNode) {
  const ownGroupRoles =
    options && Array.isArray(options.ownGroupRoles)
      ? options.ownGroupRoles
      : [];
  let missingContext = getMissingContext(virtualNode, ownGroupRoles);

  if (!missingContext) {
    return true;
  }
  const owners = getAriaOwners(node);
  if (owners) {
    for (let i = 0, l = owners.length; i < l; i++) {
      missingContext = getMissingContext(
        getNodeFromTree(owners[i]),
        ownGroupRoles,
        missingContext.missingParents,
        true
      );
      if (!missingContext) {
        return true;
      }
    }
  }

  const { missingParents, ancestor } = missingContext;
  const attr = getPresentationalConflictAttr(ancestor);
  if (attr) {
    this.relatedNodes([ancestor]);
    this.data({
      messageKey: 'presentationalConflict',
      values: missingParents.join(', '),
      attr
    });
    return false;
  }

  this.data(missingParents);
  return false;
}

export default ariaRequiredParentEvaluate;
