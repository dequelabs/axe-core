let parent = node;
while ((parent = axe.commons.dom.getComposedParent(parent))) {
	// Unlike with UL|OL+LI, DT|DD must be in a DL
	if (parent.nodeName.toUpperCase() !== 'DL') {
		continue;
	}

	const parentRole = (parent.getAttribute('role') || '').toLowerCase();
	if (
		!parentRole ||
		!axe.commons.aria.isValidRole(parentRole, { disallowAbstract: true })
	) {
		return true;
	}

	if (parentRole === 'list') {
		return true;
	}
}

return false;
