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
			// TODO: what to do about native matches()? use qsa matchers?
			return axe.utils.matchesSelector(node, matcher);
		}

		if (typeof isXHTMLGlobal === 'undefined') {
			isXHTMLGlobal = axe.utils.isXHTML(node.ownerDocument);
		}
		isXHTML = isXHTMLGlobal;
	}

	let vNode =
		node instanceof axe.AbstractVirtualNode
			? node
			: axe.utils.getNodeFromTree(node);
	return matches.fromPrimative(vNode.props().nodeName, matcher);
};
