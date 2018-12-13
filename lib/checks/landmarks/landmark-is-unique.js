function getRoleSelectors(roleId) {
	const role = axe.commons.aria.lookupTable.role[roleId];
	let selectors = [];
	if (role && role.implicit) {
		selectors = selectors.concat(role.implicit);
	}
	selectors.push("[role='" + roleId + "']");
	return selectors;
}

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

function evaluate(node, options) {
	if (isLandmark(node) === false) {
		return false;
	}

	const role = getObservedRoleForElement(node);
	let label = axe.commons.aria.label(node);
	let candidates = [];
	const selectors = getRoleSelectors(role);
	const selectorsLength = selectors.length;
	label = label ? label.toLowerCase() : null;
	for (let selectorPos = 0; selectorPos < selectorsLength; selectorPos++) {
		candidates = candidates.concat(
			axe.utils.toArray(document.querySelectorAll(selectors[selectorPos]))
		);
	}
	const candidatesLength = candidates.length;
	if (candidatesLength > 1) {
		for (
			let candidatePos = 0;
			candidatePos < candidatesLength;
			candidatePos++
		) {
			const candidate = candidates[candidatePos];
			if (
				candidate !== node &&
				isLandmark(candidate) &&
				axe.commons.dom.isVisible(candidate, true)
			) {
				let candidateLabel = axe.commons.aria.label(candidate);
				candidateLabel = candidateLabel ? candidateLabel.toLowerCase() : null;
				if (label === candidateLabel) {
					return false;
				}
			}
		}
	}

	return true;
}

return evaluate(node, options);
