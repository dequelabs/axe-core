/* global aria, dom */

/**
 * Get an element's owned elements
 *
 * @param {VirtualNode} element
 * @return {VirtualNode[]} Owned elements
 */
aria.getOwnedVirtual = function getOwned({ actualNode, children }) {
	if (!actualNode || !children) {
		throw new Error('getOwnedVirtual requires a virtual node');
	}
	// TODO: Check that the element has a role
	// TODO: Descend into children with role=presentation|none
	// TODO: Exclude descendents owned by other elements

	return dom.idrefs(actualNode, 'aria-owns').reduce((ownedElms, element) => {
		if (element) {
			const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], element);
			ownedElms.push(virtualNode);
		}
		return ownedElms;
	}, children);
};
