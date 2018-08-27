const parent = axe.commons.dom.getComposedParent(node);
const parentTagName = parent.nodeName.toUpperCase();

// Unlike with UL|OL+LI, DT|DD must be in a DL
if (parentTagName !== 'DL') {
	return false;
}

const parentRole = (parent.getAttribute('role') || '').toLowerCase();
if (!parentRole || !axe.commons.aria.isValidRole(parentRole)) {
	return true;
}

if (parentRole === 'list') {
	return true;
}

return false;
