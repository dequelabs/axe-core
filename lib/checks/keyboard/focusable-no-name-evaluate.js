import { isFocusable } from '../../commons/dom';
import { accessibleTextVirtual } from '../../commons/text';

function focusableNoNameEvaluate(node, options, virtualNode) {
	var tabIndex = node.getAttribute('tabindex'),
		inFocusOrder = isFocusable(node) && tabIndex > -1;
	if (!inFocusOrder) {
		return false;
	}
	return !accessibleTextVirtual(virtualNode);
}

export default focusableNoNameEvaluate;
