function getObservedRoleForElement(element) {
	let role = element.getAttribute('role');
	role = role ? role.trim() : role;
	if (!role) {
		role = axe.commons.aria.implicitRole(element);
		const tagName = element.tagName.toLowerCase();
		if (tagName === 'header' || tagName === 'footer') {
			let parent = element.parentNode;
			while (parent && parent.nodeType === 1) {
				const parentTagName = parent.tagName.toLowerCase();
				const excludedDescendants = [
					'article',
					'aside',
					'main',
					'nav',
					'section'
				];
				if (excludedDescendants.indexOf(parentTagName) >= 0) {
					role = null;
				}
				parent = parent.parentNode;
			}
		} else if (tagName === 'section') {
			const label = axe.commons.aria.label(element);
			if (!label) {
				role = null;
			}
		}
	}
	if (role) {
		role = role.toLowerCase();
	}
	return role;
}

function isLandmark(element) {
	const landmarkRoles = axe.commons.aria.getRolesByType('landmark');
	const role = getObservedRoleForElement(element);

	return (role && landmarkRoles.indexOf(role) >= 0) || role === 'region';
}

return isLandmark(node) && axe.commons.dom.isVisible(node, true);
