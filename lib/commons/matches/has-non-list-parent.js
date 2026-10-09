import getExplicitRole from '../aria/get-explicit-role';
import { hasConflictResolution } from '../aria/get-role';
import implicitHtmlRoles from '../standards/implicit-html-roles';
import { isValidCustomElementName } from '../../core/utils';
import fromPrimitive from './from-primitive';

/**
 * Match a known parent that does not have list semantics. Missing parent
 * context does not establish a non-list parent, including a scoped tree root.
 *
 * @param {VirtualNode} vNode
 * @param {Boolean} matcher
 * @returns {Boolean}
 */
export default function hasNonListParent(vNode, matcher) {
  const parent = vNode.parent;
  if (!parent) {
    return fromPrimitive(false, matcher);
  }

  let role = getExplicitRole(parent, { fallback: true, dpub: true });
  if (
    ['none', 'presentation'].includes(role) &&
    hasConflictResolution(parent)
  ) {
    // Custom elements lose their internal role on presentation conflicts.
    if (isValidCustomElementName(parent.props.nodeName)) {
      return fromPrimitive(true, matcher);
    }
    role = null;
  }

  // Only static HTML mappings produce list roles. Computing the parent's full
  // role can recurse when its accessible name references this list item.
  role ||=
    parent.elementInternals?.role || implicitHtmlRoles[parent.props.nodeName];
  return fromPrimitive(role !== 'list', matcher);
}
