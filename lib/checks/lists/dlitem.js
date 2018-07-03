const parent = axe.commons.dom.getComposedParent(node);
if (!parent) {
	return false;
}

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

if (parentRole) {
	if (parentRole === 'list') {
		return true;
	}
	return false;
}
