let parent = node;
while ((parent = axe.commons.dom.getComposedParent(parent))) {
	const parentTagName = parent.nodeName.toUpperCase();
	const parentRole = (parent.getAttribute('role') || '').toLowerCase();

	if (parentRole === 'list') {
		return true;
	}

	if (
		parentRole &&
		axe.commons.aria.isValidRole(parentRole, { disallowAbstract: true })
	) {
		continue;
	}

	if (['UL', 'OL'].includes(parentTagName)) {
		return true;
	}
}

return false;
