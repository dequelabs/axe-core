const elmsThatCanBeDisabled = [
	'BUTTON',
	'FIELDSET',
	'INPUT',
	'OPTGROUP',
	'OPTION',
	'SELECT',
	'TEXTAREA'
];

const elmsWithTabIndex = axe.utils.querySelectorAll(virtualNode, '[tabindex]');

// handle any tabindex < 0, to discern if element has been taken out of tab order
let relatedNodes = [];

const elmsOutOfTabOrder = elmsWithTabIndex.filter(({ actualNode: el }) => {
	let tabIndex = el.getAttribute('tabindex');

	tabIndex =
		tabIndex && !isNaN(parseInt(tabIndex, 10)) ? parseInt(tabIndex) : null;

	if (tabIndex && tabIndex < 0) {
		// populate only notes that cannot be disabled
		const nodeName = el.nodeName.toUpperCase();
		if (!elmsThatCanBeDisabled.includes(nodeName)) {
			relatedNodes.push(el);
		}
		return true;
	}
	return false;
});

if (relatedNodes.length) {
	this.relatedNodes(relatedNodes);
}

return elmsOutOfTabOrder.length > 0;
