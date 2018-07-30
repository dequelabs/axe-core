const parent = axe.commons.dom.getComposedParent(node);
if (!parent) {
	return false;
}

const ALLOWED_TAGS = ['UL', 'OL'];
const parentTagName = parent.nodeName.toUpperCase();

const parentRole = (parent.getAttribute('role') || '').toLowerCase();
if (parentRole && !axe.commons.aria.isValidRole(parentRole)) {
	return false;
}

const isListRole = parentRole === 'list';
return (
	(ALLOWED_TAGS.includes(parentTagName) && (!parentRole || isListRole)) ||
	isListRole
);
