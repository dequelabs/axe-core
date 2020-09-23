function headingOrderEvaluate(node, options, virtualNode) {
	const ariaHeadingLevel = virtualNode.attr('aria-level');
	const nodeName = virtualNode.props.nodeName;

	if (ariaHeadingLevel !== null) {
		this.data(parseInt(ariaHeadingLevel, 10));
		return true;
	}

	const headingLevel = nodeName.toUpperCase().match(/H(\d)/);

	if (headingLevel) {
		this.data(parseInt(headingLevel[1], 10));
		return true;
	}

	return true;
}

export default headingOrderEvaluate;
