function ariaHiddenBodyEvaluate(node, options, virtualNode) {
	return (
		virtualNode.hasAttr('aria-hidden') !== true ||
		virtualNode.attr('aria-hidden') === 'false'
	);
}

export default ariaHiddenBodyEvaluate;
