const elmsThatCanBeDisabled = [
	'BUTTON',
	'FIELDSET',
	'INPUT',
	'OPTGROUP',
	'OPTION',
	'SELECT',
	'TEXTAREA'
];

const focusableElms = axe.commons.dom.getFocusableElements(virtualNode);

const relatedNodes = focusableElms.reduce((out, { actualNode: el }) => {
	// populate only notes that can be disabled
	const nodeName = el.nodeName.toUpperCase();
	if (elmsThatCanBeDisabled.includes(nodeName)) {
		out.push(el);
	}
	return out;
}, []);

if (relatedNodes.length) {
	this.relatedNodes(relatedNodes);
}

return !(focusableElms.length > 0);
