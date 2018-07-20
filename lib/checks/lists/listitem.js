const parent = axe.commons.dom.getComposedParent(node);
if (!parent) {
	// Can only happen with detached DOM nodes and roots:
	return undefined;
}

const parentTagName = parent.nodeName.toUpperCase();
const parentRole = (parent.getAttribute('role') || '').toLowerCase();

if (parentRole === 'list') {
	return true;
}

if (parentRole && axe.commons.aria.isValidRole(parentRole)) {
	return false;
}

return ['UL', 'OL'].includes(parentTagName);
