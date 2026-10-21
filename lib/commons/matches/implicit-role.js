import fromPrimitive from './from-primitive';
import getImplicitRole from '../aria/implicit-role';

/**
 * Check if a virtual node matches an implicit role(s)
 *``
 * Note: matches.implicitRole(vNode, matcher) can be indirectly used through
 * matches(vNode, { implicitRole: matcher })
 *
 * Example:
 * ```js
 * matches.implicitRole(vNode, ['combobox', 'textbox']);
 * matches.implicitRole(vNode, 'combobox');
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
function implicitRole(vNode, matcher) {
  return fromPrimitive(getImplicitRole(vNode), matcher);
}

export default implicitRole;
