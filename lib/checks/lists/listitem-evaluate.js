import { getComposedParent } from '../../commons/dom';

// DAISY-AXE
import { getSuperClassRole, isValidRole } from '../../commons/aria';
// import { isValidRole } from '../../commons/aria';

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
		// DAISY-AXE
		const sup = getSuperClassRole(parentRole);
		if (sup && sup.includes('list')) {
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
