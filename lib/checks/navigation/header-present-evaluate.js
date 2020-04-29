import { querySelectorAll } from '../../core/utils';

function headerPresentEvaluate(node, options, virtualNode) {
	return !!querySelectorAll(
		virtualNode,
		'h1, h2, h3, h4, h5, h6, [role="heading"]'
	)[0];
}

export default headerPresentEvaluate;
