import { sanitize, subtreeText } from '../../commons/text';

function hasTextContentEvaluate(node, options, virtualNode) {
	return sanitize(subtreeText(virtualNode)) !== '';
}

export default hasTextContentEvaluate;
