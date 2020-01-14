/* global matches */
/**
 * Check if a node matches some attribute(s)
 *
 * Note: matches.attributes(node, matcher) can be indirectly used through
 * matches(node, { attributes: matcher })
 *
 * Example:
 * ```js
 * matches.attributes(node, {
 *   'aria-live': 'assertive', // Simple string match
 *   'aria-expanded': /true|false/i, // either boolean, case insensitive
 * })
 * ```
 *
 * @param {HTMLElement|VirtualNode} node
 * @param {Object} Attribute matcher
 * @returns {Boolean}
 */
matches.attributes = function matchesAttributes(node, matcher) {
	let vNode =
		node instanceof axe.AbstractVirtualNode
			? node
			: axe.utils.getNodeFromTree(node);
	return matches.fromFunction(attrName => vNode.attr(attrName), matcher);
};
