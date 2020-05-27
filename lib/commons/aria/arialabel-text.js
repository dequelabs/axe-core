/**
 * Get the text value of aria-label, if any
 *
 * @deprecated Do not use Element directly. Pass VirtualNode instead
 * @param {VirtualNode|Element} element
 * @return {string} ARIA label
 */
function arialabelText(node) {
	// TODO: this is a ridiculous hack since webpack is making these two
	// separate functions
	// TODO: es-module-AbstractVirtualNode
	if (!axe._isAbstractNode(node)) {
		if (node.nodeType !== 1) {
			return '';
		}
		// TODO: es-module-utils.getNodeFromTree
		node = axe.utils.getNodeFromTree(node);
	}
	return node.attr('aria-label') || '';
}

export default arialabelText;
