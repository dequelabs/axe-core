import { getRootNode, isVisible } from '../../commons/dom';
import { accessibleTextVirtual } from '../../commons/text';
import { escapeSelector } from '../../core/utils';

function hiddenExplicitLabelEvaluate(node, options, virtualNode) {
	if (node.getAttribute('id')) {
		const root = getRootNode(node);
		const id = escapeSelector(node.getAttribute('id'));
		const label = root.querySelector(`label[for="${id}"]`);

		if (label && !isVisible(label, true)) {
			const name = accessibleTextVirtual(virtualNode).trim();
			const isNameEmpty = name === '';
			return isNameEmpty;
		}
	}
	return false;
}

export default hiddenExplicitLabelEvaluate;
