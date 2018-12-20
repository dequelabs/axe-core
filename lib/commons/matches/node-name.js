/* global matches */
let isXHTMLGlobal;
/**
 * Check if the nodeName of a node matches some value
 *
 * Note: matches.nodeName(node, matcher) can be indirectly used through
 * matches(node, { nodeName: matcher })
 *
 * Example:
 * ```js
 * matches.nodeName(node, ['div', 'span'])
 * ```
 *
 * @param {HTMLElement|VirtualNode} node
 * @param {Object} Attribute matcher
 * @returns {Boolean}
 */
matches.nodeName = function matchNodeName(node, matcher, { isXHTML } = {}) {
	node = node.actualNode || node;
	if (typeof isXHTML === 'undefined') {
		// When the matcher is a string, use native .matches() function:
		if (typeof matcher === 'string') {
			return axe.utils.matchesSelector(node, matcher);
		}

		if (typeof isXHTMLGlobal === 'undefined') {
			isXHTMLGlobal = axe.utils.isXHTML(node.ownerDocument);
		}
		isXHTML = isXHTMLGlobal;
	}

	const nodeName = isXHTML ? node.nodeName : node.nodeName.toLowerCase();
	return matches.fromPrimative(nodeName, matcher);
};
