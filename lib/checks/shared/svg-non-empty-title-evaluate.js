import visibleVirtual from '../../commons/text/visible-virtual';

function svgNonEmptyTitleEvaluate(node, options, virtualNode) {
	try {
		const titleNode = virtualNode.children.find(({ props }) => {
			return props.nodeName === 'title';
		});
		return !!titleNode && visibleVirtual(titleNode) !== '';
	} catch (e) {
		return undefined;
	}
}

export default svgNonEmptyTitleEvaluate;
