function nonEmptyTitleEvaluate(node, options, virtualNode) {
	const { text } = axe.commons;
	return !!text.sanitize(text.titleText(node));
}

export default nonEmptyTitleEvaluate;
