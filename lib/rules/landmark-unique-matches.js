function getObservedRoleForElement(element) {
	let role = element.getAttribute('role');
	role = role ? role.trim() : role;
	if (!role) {
		role = getElementImplicitLandmarkRole(element);
	}
	if (role) {
		role = role.toLowerCase();
	}
	return role;
}

function isHeaderFooterLandmark(headerFooterElement) {
	const excludedDescendants = ['article', 'aside', 'main', 'nav', 'section'];

	let parent = headerFooterElement.parentNode;
	while (parent && parent.nodeType === 1) {
		const parentTagName = parent.nodeName.toLowerCase();
		if (excludedDescendants.indexOf(parentTagName) >= 0) {
			return false;
		}
		parent = parent.parentNode;
	}

	return true;
}

function getElementImplicitLandmarkRole(element) {
	let role = axe.commons.aria.implicitRole(element);
	const tagName = element.nodeName.toLowerCase();
	if (tagName === 'header' || tagName === 'footer') {
		return isHeaderFooterLandmark(element) ? role : null;
	}

	if (tagName === 'section') {
		const label = axe.commons.aria.label(element);
		if (!label) {
			role = null;
		}
	}

	return role;
}

function isLandmark(element) {
	const landmarkRoles = axe.commons.aria.getRolesByType('landmark');
	const role = getObservedRoleForElement(element);

	return (role && landmarkRoles.indexOf(role) >= 0) || role === 'region';
}

return isLandmark(node) && axe.commons.dom.isVisible(node, true);
