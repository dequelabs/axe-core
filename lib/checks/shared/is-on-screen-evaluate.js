function isOnScreenEvaluate(node, options, virtualNode) {
	// From a visual perspective
	return (
		axe.commons.dom.isVisible(node, false) && !axe.commons.dom.isOffscreen(node)
	);
}

export default isOnScreenEvaluate;
