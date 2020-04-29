import { sanitize } from '../../commons/text';

function nonEmptyValueEvaluate(node) {
	var label = node.getAttribute('value');
	return !!(label ? sanitize(label).trim() : '');
}

export default nonEmptyValueEvaluate;
