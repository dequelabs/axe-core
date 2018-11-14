const domTree = axe.utils.querySelectorAll(virtualNode, '*');

const relatedNodes = [];

const result = domTree.every(({ actualNode: el }) => {
	const isElFocusable = axe.commons.dom.isFocusable(el);
	let tabIndex = el.getAttribute('tabindex');
	// dom.isFocusable does not check for tabindex
	// this checks if a given `el` has been taken out of tab order
	tabIndex =
		tabIndex && !isNaN(parseInt(tabIndex, 10)) ? parseInt(tabIndex) : null;
	if (isElFocusable && (tabIndex && tabIndex < 0)) {
		return true;
	}
	if (isElFocusable === false) {
		return true;
	}
	// add to related nodes
	relatedNodes.push(el);
	return false;
});

if (relatedNodes.length) {
	this.relatedNodes(relatedNodes);
}

return result;
