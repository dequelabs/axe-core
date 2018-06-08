const parent = axe.commons.dom.getComposedParent(node);

if (!parent) {
	return false;
}

const ALLOWED_ROLES = ['list'];
const parentTagName = parent.nodeName.toLowerCase();
const parentRole = (parent.getAttribute('role') || '').toLowerCase();

if (parentTagName === 'dl') {
	if (parentRole) {
		if (ALLOWED_ROLES.includes(parentRole)) {
			return true;
		}
		return false;
	}
	return true;
}

return false;
