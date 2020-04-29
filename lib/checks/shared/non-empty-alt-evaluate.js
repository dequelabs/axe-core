import { sanitize } from '../../commons/text';

function nonEmptyAltEvaluate(node, options, virtualNode) {
	const label = virtualNode.attr('alt');
	return !!(label ? sanitize(label).trim() : '');
}

export default nonEmptyAltEvaluate;
