import fromFunction from './from-function';

/**
 * Check if a virtual node matches some attribute(s)
 *
 * Note: matches.attributes(vNode, matcher) can be indirectly used through
 * matches(vNode, { attributes: matcher })
 *
 * Example:
 * ```js
 * matches.attributes(vNode, {
 *   'aria-live': 'assertive', // Simple string match
 *   'aria-expanded': /true|false/i, // either boolean, case insensitive
 * })
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @param {HTMLElement|VirtualNode} vNode
 * @param {Object} Attribute matcher
 * @returns {Boolean}
 */
function attributes(vNode, matcher) {
	// TODO: this is a ridiculous hack since webpack is making these two
	// separate functions
	// TODO: es-module-AbstractVirtualNode
	if (!axe._isAbstractNode(vNode)) {
		// TODO: es-module-utils.getNodeFromTree
		vNode = axe.utils.getNodeFromTree(vNode);
	}
	return fromFunction(attrName => vNode.attr(attrName), matcher);
}

export default attributes;
