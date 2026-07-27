import { matches } from '../../core/utils';

/**
 * Check if a virtual node is the first child element of the type.
 *``
 * Note: matches.firstOfType(vNode, selector) can be indirectly used through
 * matches(vNode, { firstOfType: selector })
 *
 * Example:
 * ```js
 * matches.firstOfType(vNode, 'main');
 * matches.firstOfType(vNode, 'button:not([role])');
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {String} selector
 * @returns {Boolean}
 */
export default function firstOfType(vNode, selector) {
  const firstMatch = vNode.parent.children.find(node =>
    matches(node, selector)
  );

  return firstMatch === vNode;
}
