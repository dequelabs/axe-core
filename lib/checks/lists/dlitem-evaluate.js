import { getComposedParent } from '../../commons/dom';
import { getRole } from '../../commons/aria';

function dlitemEvaluate(node) {
	let parent = getComposedParent(node);
	let parentTagName = parent.nodeName.toUpperCase();
	let parentRole = getRole(parent, { noImplicit: true });

	if (
		parentTagName === 'DIV' &&
		['presentation', 'none', null].includes(parentRole)
	) {
		parent = getComposedParent(parent);
		parentTagName = parent.nodeName.toUpperCase();
		parentRole = getRole(parent, { noImplicit: true });
	}

	// Unlike with UL|OL+LI, DT|DD must be in a DL
	if (parentTagName !== 'DL') {
		return false;
	}

	if (!parentRole || parentRole === 'list') {
		return true;
	}

	return false;
}

export default dlitemEvaluate;
