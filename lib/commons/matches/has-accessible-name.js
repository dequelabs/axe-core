import accessibleTextVirtual from '../text/accessible-text-virtual';
import fromPrimative from './from-primative';

/**
 * Check if a virtual node has a non-empty accessible name
 *``
 * Note: matches.hasAccessibleName(vNode, true) can be indirectly used through
 * matches(vNode, { hasAccessibleName: boolean })
 *
 * Example:
 * ```js
 * matches.hasAccessibleName(vNode, true);
 * matches.hasAccessibleName(vNode, false);
 *
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
function hasAccessibleName(vNode, matcher) {
  return fromPrimative(!!accessibleTextVirtual(vNode), matcher);
}

export default hasAccessibleName;
