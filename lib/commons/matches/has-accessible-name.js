import accessibleTextVirtual from '../text/accessible-text-virtual';
import fromPrimative from './from-primative';

/**
 * Check if a virtual node has accessibile text
 *``
 * Note: matches.accessibleName(vNode, true) can be indirectly used through
 * matches(vNode, { accessibleName: boolean })
 *
 * Example:
 * ```js
 * matches.accessibleName(vNode, true);
 * matches.accessibleName(vNode, false);
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
