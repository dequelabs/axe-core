function hasVisibleTextEvaluate(node, options, virtualNode) {
	return axe.commons.text.accessibleTextVirtual(virtualNode).length > 0;
}

export default hasVisibleTextEvaluate;
