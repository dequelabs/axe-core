function ariaHiddenBodyEvaluate(node) {
	return node.getAttribute('aria-hidden') !== 'true';
}

export default ariaHiddenBodyEvaluate;
