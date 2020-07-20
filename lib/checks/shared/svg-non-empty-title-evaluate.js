import visibleVirtual from '../../commons/text/visible-virtual';

function svgNonEmptyTitleEvaluate(node, options, virtualNode) {
	if (!virtualNode.children) {
		return undefined;
	}

	const titleNode = virtualNode.children.find(({ props }) => {
		return props.nodeName === 'title';
	});
	return !!titleNode && visibleVirtual(titleNode) !== '';
}

export default svgNonEmptyTitleEvaluate;
