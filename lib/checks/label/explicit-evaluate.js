import { getRootNode, isVisible } from '../../commons/dom';
import { accessibleText } from '../../commons/text';
import { escapeSelector } from '../../core/utils';

function explicitEvaluate(node) {
	if (node.getAttribute('id')) {
		const root = getRootNode(node);
		const id = escapeSelector(node.getAttribute('id'));
		const label = root.querySelector(`label[for="${id}"]`);

		if (label) {
			// defer to hidden-explicit-label check for better messaging
			if (!isVisible(label)) {
				return true;
			} else {
				return !!accessibleText(label);
			}
		}
	}
	return false;
}

export default explicitEvaluate;
