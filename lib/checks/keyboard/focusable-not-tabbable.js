const elementsThatCanBeDisabled = [
	'BUTTON',
	'FIELDSET',
	'INPUT',
	'SELECT',
	'TEXTAREA'
];

const tabbableElements = virtualNode.tabbableElements;

if (!tabbableElements || !tabbableElements.length) {
	return true;
}

const relatedNodes = tabbableElements.reduce((out, { actualNode: el }) => {
	const nodeName = el.nodeName.toUpperCase();
	// populate nodes that cannot be disabled
	if (!elementsThatCanBeDisabled.includes(nodeName)) {
		out.push(el);
	}
	return out;
}, []);

this.relatedNodes(relatedNodes);

// without an incomplete message, this will not show up in the remediation
// message (which is what we want)
if (relatedNodes.length > 0 && axe.commons.dom.isModalOpen()) {
	return undefined;
}

return relatedNodes.length === 0;
