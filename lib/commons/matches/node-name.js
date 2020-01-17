/* global matches */
/**
 * Check if the nodeName of a node matches some value.
 *
 * Note: matches.nodeName(node, matcher) can be indirectly used through
 * matches(node, { nodeName: matcher })
 *
 * Example:
 * ```js
 * matches.nodeName(node, ['div', 'span'])
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @param {HTMLElement|VirtualNode} node
 * @param {Object} Attribute matcher
 * @returns {Boolean}
 */
matches.nodeName = function matchNodeName(node, matcher) {
	const vNode =
		node instanceof axe.AbstractVirtualNode
			? node
			: axe.utils.getNodeFromTree(node);
	return matches.fromPrimative(vNode.props.nodeName, matcher);
};
