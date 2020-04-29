function nonEmptyAltEvaluate(node, options, virtualNode) {
	const label = virtualNode.attr("alt");
	return !!(label ? axe.commons.text.sanitize(label).trim() : "");
}

export default nonEmptyAltEvaluate;
