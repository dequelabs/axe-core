const descendents = axe.utils.querySelectorAll(virtualNode, '*');

const relatedNodes = [];

const nonFocusableElements = descendents.filter(({ actualNode: el }) => {
	const isElFocusable = axe.commons.dom.isFocusable(el);

	// Note:
	// although `dom.isFocusable` checks for tabindex validity, it does not return the tabindex value
	// we need hhe value of the tabindex to compare with focusable element
	// in order to compute if a given `el` has been taken out of tab order.
	let tabIndex = el.getAttribute('tabindex');
	tabIndex =
		tabIndex && !isNaN(parseInt(tabIndex, 10)) ? parseInt(tabIndex) : null;
	if (isElFocusable && (tabIndex && tabIndex < 0)) {
		return true;
	}
	if (isElFocusable === false) {
		return true;
	}
	relatedNodes.push(el);
	return false;
});

if (nonFocusableElements.length === descendents.length) {
	return true;
}

if (relatedNodes.length) {
	this.relatedNodes(relatedNodes);
}

return false;
