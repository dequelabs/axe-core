/*
 * Since this is a best-practice rule, we are filtering elements as dictated by ARIA 1.1 Practices regardless of treatment by browser/AT combinations.
 *
 * Info: https://www.w3.org/TR/wai-aria-practices-1.1/#aria_landmark
 */
const excludedParentsForHeaderFooterLandmarks = [
	'article',
	'aside',
	'main',
	'nav',
	'section'
].join(',');
function isHeaderFooterLandmark(headerFooterElement) {
	return !axe.commons.dom.findUp(
		headerFooterElement,
		excludedParentsForHeaderFooterLandmarks
	);
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
