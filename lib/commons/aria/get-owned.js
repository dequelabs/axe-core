/* global aria, dom */
aria.getOwnedVirtual = function getOwned({ actualNode, children }) {
	return dom.idrefs(actualNode, 'aria-owns').reduce((ownedElm, element) => {
		if (element) {
			let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], element);
			ownedElm.push(virtualNode);
		}
		return ownedElm;
	}, children);
};
