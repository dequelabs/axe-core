function ariaLabelEvaluate(node, options, virtualNode) {
	const { text, aria } = axe.commons;
	return !!text.sanitize(aria.arialabelText(virtualNode));
}

export default ariaLabelEvaluate;
