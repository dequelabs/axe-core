function ariaHiddenBodyEvaluate(node, options, virtualNode) {
	return virtualNode.hasAttr('aria-hidden') !== 'true';
}

export default ariaHiddenBodyEvaluate;
