/* global aria, dom */
aria.getOwnedVirtual = function getOwned({ actualNode, children }) {
	if (!actualNode || !children) {
		throw new Error('getOwnedVirtual requires a virtual node');
	}
	return dom.idrefs(actualNode, 'aria-owns').reduce((ownedElm, element) => {
		if (element) {
			const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], element);
			ownedElm.push(virtualNode);
		}
		return ownedElm;
	}, children);
};
