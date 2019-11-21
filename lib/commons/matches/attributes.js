import fromFunction from './from-function';

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
function attributes(node, matcher) {
	node = node.actualNode || node;
	return fromFunction(attrName => node.getAttribute(attrName), matcher);
}

export default attributes;
