/**
 * Check if a virtual node is the first child element of a details element.
 *``
 * Note: matches.summaryForDetails(vNode) can be indirectly used through
 * matches(vNode, { summaryForDetails: true })
 *
 * Example:
 * ```js
 * matches.summaryForDetails(vNode);
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {String} selector
 * @returns {Boolean}
 */
export default function summaryForDetails(vNode) {
  if (!vNode.parent || vNode.parent.props.nodeName !== 'details') {
    return false;
  }

  const firstMatch = vNode.parent.children.find(
    node => node.props.nodeName === 'summary'
  );
  return firstMatch === vNode;
}
