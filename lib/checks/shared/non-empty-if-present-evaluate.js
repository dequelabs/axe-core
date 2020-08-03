function nonEmptyIfPresentEvaluate(node, options, virtualNode) {
	// Check for 'default' names, which are given to reset and submit buttons
	let nodeName = virtualNode.props.nodeName;
	let type = (virtualNode.attr('type') || '').toLowerCase();
	let label = virtualNode.attr('value');

	if (label) {
		this.data({
			messageKey: 'has-label'
		});
	}

	if (nodeName === 'input' && ['submit', 'reset'].includes(type)) {
		return label === null;
	}
	return false;
}

export default nonEmptyIfPresentEvaluate;
