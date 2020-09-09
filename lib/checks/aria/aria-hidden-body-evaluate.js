function ariaHiddenBodyEvaluate(node, options, virtualNode) {
	return virtualNode.attr('aria-hidden') !== 'true';
}

export default ariaHiddenBodyEvaluate;
