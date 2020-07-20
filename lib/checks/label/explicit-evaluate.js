import { getRootNode, isVisible } from '../../commons/dom';
import { accessibleText } from '../../commons/text';
import { escapeSelector } from '../../core/utils';

function explicitEvaluate(node, options, virtualNode) {
	try {
		if (virtualNode.attr('id')) {
			const root = getRootNode(virtualNode.actualNode);
			const id = escapeSelector(virtualNode.attr('id'));
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
	} catch (e) {
		return undefined;
	}
}

export default explicitEvaluate;
