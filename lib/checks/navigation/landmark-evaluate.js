function landmarkEvaluate(node, options, virtualNode) {
	return (
		axe.utils.querySelectorAll(virtualNode, 'main, [role="main"]').length > 0
	);
}

export default landmarkEvaluate;
