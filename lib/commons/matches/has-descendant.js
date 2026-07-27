import { querySelectorAllFilter } from '../../core/utils';

/**
 * Check if a virtual node has a descendant that matches the selector.
 *``
 * Note: matches.hasDescendant(vNode, selector) can be indirectly used through
 * matches(vNode, { hasDescendant: selector })
 *
 * Example:
 * ```js
 * matches.hasDescendant(vNode, 'main');
 * matches.hasDescendant(vNode, 'button:not([role])');
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {String} selector
 * @returns {Boolean}
 */
export default function hasDescendant(vNode, selector) {
  return querySelectorAllFilter(vNode, selector).length > 0;
}
