import { getComposedParent } from '../../commons/dom';
import { getRoleType, isValidRole } from '../../commons/aria';

function listitemEvaluate(node) {
	const parent = getComposedParent(node);
	if (!parent) {
		// Can only happen with detached DOM nodes and roots:
		return undefined;
	}

	const parentTagName = parent.nodeName.toUpperCase();
	const parentRole = (parent.getAttribute('role') || '').toLowerCase();

	if (['presentation', 'none', 'list'].includes(parentRole)) {
		return true;
	}

	if (parentRole && isValidRole(parentRole)) {
		if (getRoleType(parentRole) === 'list') {
			return true;
		}

		this.data({
			messageKey: 'roleNotValid'
		});
		return false;
	}

	return ['UL', 'OL'].includes(parentTagName);
}

export default listitemEvaluate;
