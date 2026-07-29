/**
 * Check if a virtual node is the first child element of a details element.
 *``
 * Note: matches.isSummaryForDetails(vNode) can be indirectly used through
 * matches(vNode, { isSummaryForDetails: true })
 *
 * Example:
 * ```js
 * matches.isSummaryForDetails(vNode);
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {String} selector
 * @returns {Boolean}
 */
export default function isSummaryForDetails(vNode) {
  if (!vNode.parent || vNode.parent.props.nodeName !== 'details') {
    return false;
  }

  const firstMatch = vNode.parent.children.find(
    node => node.props.nodeName === 'summary'
  );
  return firstMatch === vNode;
}
