const parent = axe.commons.dom.getComposedParent(node);
const parentTagName = parent.nodeName.toUpperCase();

if (parentTagName !== 'DL') {
	return false;
}

const parentRole = (parent.getAttribute('role') || '').toLowerCase();

if (!parentRole) {
	return true;
}

if (!axe.commons.aria.isValidRole(parentRole)) {
	return false;
}

if (parentRole === 'list') {
	return true;
}

return false;
