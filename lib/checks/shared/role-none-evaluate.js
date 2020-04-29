function roleNoneEvaluate(node, options, virtualNode) {
	return node.getAttribute("role") === "none";
}

export default roleNoneEvaluate;
