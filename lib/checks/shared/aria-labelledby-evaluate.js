function ariaLabelledbyEvaluate(node, options, virtualNode) {
	const { text, aria } = axe.commons;
	return !!text.sanitize(aria.arialabelledbyText(node));
}

export default ariaLabelledbyEvaluate;
