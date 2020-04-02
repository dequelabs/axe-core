/**
 * Get the text value of aria-label, if any
 *
 * @deprecated Do not use Element directly. Pass VirtualNode instead
 * @param {VirtualNode|Element} element
 * @return {string} ARIA label
 */
function arialabelText(node) {
	// TODO: es-module-AbstractVirtualNode
	if (node instanceof axe.AbstractVirtualNode === false) {
		if (node.nodeType !== 1) {
			return '';
		}
		// TODO: es-module-utils.getNodeFromTree
		node = axe.utils.getNodeFromTree(node);
	}
	return node.attr('aria-label') || '';
}

export default arialabelText;
