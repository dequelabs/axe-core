import fromFunction from './from-function';

/**
 * Check if a virtual node matches some attribute(s)
 *
 * Note: matches.properties(vNode, matcher) can be indirectly used through
 * matches(vNode, { properties: matcher })
 *
 * Example:
 * ```js
 * matches.properties(vNode, {
 *   type: 'text', // Simple string match
 *   value: value => value.trim() !== '', // None-empty value, using a function matcher
 * })
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @param {HTMLElement|VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
function properties(vNode, matcher) {
	// TODO: this is a ridiculous hack since webpack is making these two
	// separate functions
	// TODO: es-module-AbstractVirtualNode
	if (!axe._isAbstractNode(vNode)) {
		// TODO: es-module-utils.getNodeFromTree
		vNode = axe.utils.getNodeFromTree(vNode);
	}
	return fromFunction(propName => vNode.props[propName], matcher);
}

export default properties;
