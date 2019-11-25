const elementsThatCanBeDisabled = [
	'BUTTON',
	'FIELDSET',
	'INPUT',
	'SELECT',
	'TEXTAREA'
];

function focusableDisabledEvaluate(node, options, virtualNode, context) {
	const tabbableElements = virtualNode.tabbableElements;

	if (!tabbableElements || !tabbableElements.length) {
		return true;
	}

	const relatedNodes = tabbableElements.reduce((out, { actualNode: el }) => {
		const nodeName = el.nodeName.toUpperCase();
		// populate nodes that can be disabled
		if (elementsThatCanBeDisabled.includes(nodeName)) {
			out.push(el);
		}
		return out;
	}, []);
	this.relatedNodes(relatedNodes);

	return relatedNodes.length === 0;
}

export default focusableDisabledEvaluate;