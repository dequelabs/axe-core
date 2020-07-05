import { findUpVirtual } from '../../commons/dom';
import { accessibleText } from '../../commons/text';

function implicitEvaluate(node, options, virtualNode) {
	const label = findUpVirtual(virtualNode, 'label');
	if (label) {
		return !!accessibleText(label, { inControlContext: true });
	}
	return false;
}

export default implicitEvaluate;
