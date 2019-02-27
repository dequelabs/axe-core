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

function isLandmarkVirtual({ actualNode }) {
	const landmarkRoles = axe.commons.aria.getRolesByType('landmark');
	const role = axe.commons.aria.getRole(actualNode);
	const tagName = actualNode.nodeName.toLowerCase();

	if (tagName === 'header' || tagName === 'footer') {
		return isHeaderFooterLandmark(actualNode);
	}

	if (tagName === 'section' || tagName === 'form') {
		const label = axe.commons.aria.label(actualNode);
		return !!label;
	}

	return (role && landmarkRoles.indexOf(role) >= 0) || role === 'region';
}

function isLandmark(node) {
	node = axe.utils.getNodeFromTree(axe._tree[0], node);
	return (
		isLandmarkVirtual(node) && axe.commons.dom.isVisible(node.actualNode, true)
	);
}

return isLandmark(node);
