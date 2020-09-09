import visibleVirtual from '../../commons/text/visible-virtual';

function svgNonEmptyTitleEvaluate(node, options, virtualNode) {
	try {
		const titleNode = virtualNode.children.find(({ props }) => {
			return props.nodeName === 'title';
		});

		if (!titleNode) {
			this.data({
				messageKey: 'noTitle'
			});
			return false;
		}

		if (visibleVirtual(titleNode) === '') {
			this.data({
				messageKey: 'emptyTitle'
			});
			return false;
		}

		return true;
	} catch (e) {
		return undefined;
	}
}

export default svgNonEmptyTitleEvaluate;
