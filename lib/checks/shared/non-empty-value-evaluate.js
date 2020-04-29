function nonEmptyValueEvaluate(node, options, virtualNode) {
	var label = node.getAttribute("value");
	return !!(label ? axe.commons.text.sanitize(label).trim() : "");
}

export default nonEmptyValueEvaluate;
