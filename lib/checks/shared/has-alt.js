const { nodeName } = virtualNode.props;
if (['img', 'input', 'area'].includes(nodeName) === false) {
	return false;
}

return typeof virtualNode.attr('alt') === 'string';
