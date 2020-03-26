import fromPrimative from './from-primative';

/**
 * Check if the nodeName of a virtual node matches some value.
 *
 * Note: matches.nodeName(vNode, matcher) can be indirectly used through
 * matches(vNode, { nodeName: matcher })
 *
 * Example:
 * ```js
 * matches.nodeName(vNode, ['div', 'span'])
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @param {HTMLElement|VirtualNode} vNode
 * @param {Object} Attribute matcher
 * @returns {Boolean}
 */
function nodeName(vNode, matcher) {
	// TODO: es-module-AbstractVirtualNode
	if (!(vNode instanceof axe.AbstractVirtualNode)) {
		// TODO: es-module-utils.getNodeFromTree
		vNode = axe.utils.getNodeFromTree(vNode);
	}
	return fromPrimative(vNode.props.nodeName, matcher);
}

export default nodeName;
