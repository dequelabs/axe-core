function rolePresentationEvaluate(node, options, virtualNode) {
	return node.getAttribute("role") === "presentation";
}

export default rolePresentationEvaluate;
