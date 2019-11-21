import fromFunction from './from-function';

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
function properties(node, matcher) {
	node = node.actualNode || node;
	const out = fromFunction(propName => node[propName], matcher);
	return out;
}

export default properties;
