import { matches } from '../../core/utils';

/**
 * Check if a virtual node has a direct child that matches the selector
 *
 * Note: matches.hasChild(vNode, selector) can be indirectly used through
 * matches(vNode, { hasChild: selector })
 *
 * Example:
 * ```js
 * matches.hasChild(vNode, 'main');
 * matches.hasChild(vNode, 'button:not([role])');
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {String} selector
 * @returns {Boolean}
 */
export default function hasChild(vNode, selector) {
  return vNode.children.some(node => matches(node, selector));
}
