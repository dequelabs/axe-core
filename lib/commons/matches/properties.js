/* global matches */

/**
 * Check if a node matches some attribute(s)
 *
 * Note: matches.properties(node, matcher) can be indirectly used through
 * matches(node, { properties: matcher })
 *
 * Example:
 * ```js
 * matches.properties(node, {
 *   type: 'text', // Simple string match
 *   value: value => value.trim() !== '', // None-empty value, using a function matcher
 * })
 * ```
 *
 * @param {HTMLElement|VirtualNode} node
 * @param {Object} matcher
 * @returns {Boolean}
 */
matches.properties = function matchesProperties(node, matcher) {
	const vNode =
		node instanceof axe.AbstractVirtualNode
			? node
			: axe.utils.getNodeFromTree(node);
	return matches.fromFunction(propName => vNode.props[propName], matcher);
};
