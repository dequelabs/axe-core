import fromPrimative from './from-primative';

/**
 * Check if a virtual node is the first summary child of a details element
 *
 * Note: matches.isSummaryForDetails(vNode) can be indirectly used through
 * matches(vNode, { isSummaryForDetails: boolean })
 *
 * Example:
 * ```js
 * matches.isSummaryForDetails(vNode, true);
 * matches.isSummaryForDetails(vNode, false);
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
export default function isSummaryForDetails(vNode, matcher) {
  if (!vNode.parent || vNode.parent.props.nodeName !== 'details') {
    return false;
  }

  const firstMatch = vNode.parent.children.find(
    node => node.props.nodeName === 'summary'
  );
  return fromPrimative(firstMatch === vNode, matcher);
}
