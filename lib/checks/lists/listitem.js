const parent = axe.commons.dom.getComposedParent(node);

if (!parent) {
	return false;
}

const ALLOWED_TAGS = ['ul', 'ol'];
const ALLOWED_ROLES = ['list'];

const parentTagName = parent.nodeName.toLowerCase();
const parentRole = (parent.getAttribute('role') || '').toLowerCase();
const isListRole = (ALLOWED_ROLES.includes(parentRole));

return ((ALLOWED_TAGS.includes(parentTagName) && (!parentRole || isListRole)) ||isListRole);
