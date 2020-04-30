import { querySelectorAllFilter } from '../../core/utils';
import { isVisible } from '../../commons/dom';

function pageHasElmEvaluate(node, options, virtualNode) {
	if (!options || !options.selector || typeof options.selector !== 'string') {
		throw new TypeError(
			'visible-in-page requires options.selector to be a string'
		);
	}

	const matchingElms = querySelectorAllFilter(
		virtualNode,
		options.selector,
		vNode => isVisible(vNode.actualNode, true)
	);
	this.relatedNodes(matchingElms.map(vNode => vNode.actualNode));
	return matchingElms.length > 0;
}

export default pageHasElmEvaluate;
