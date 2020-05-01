import { getRole } from '../../commons/aria';
import { visibleVirtual, accessibleTextVirtual } from '../../commons/text';
import { findUpVirtual } from '../../commons/dom';
import { getNodeFromTree } from '../../core/utils';

function duplicateImgLabelEvaluate(node, options, virtualNode) {
	if (['none', 'presentation'].includes(getRole(node))) {
		return false;
	}

	const parent = findUpVirtual(
		virtualNode,
		'button, [role="button"], a[href], p, li, td, th'
	);

	if (!parent) {
		return false;
	}

	const parentVNode = getNodeFromTree(parent);
	const visibleText = visibleVirtual(parentVNode, true).toLowerCase();
	if (visibleText === '') {
		return false;
	}

	return visibleText === accessibleTextVirtual(virtualNode).toLowerCase();
}

export default duplicateImgLabelEvaluate;
