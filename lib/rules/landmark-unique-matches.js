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
	return !axe.commons.dom.findUpVirtual(
		headerFooterElement,
		excludedParentsForHeaderFooterLandmarks
	);
}

function isLandmarkVirtual(virtualNode) {
	const { actualNode } = virtualNode;
	const landmarkRoles = axe.commons.aria.getRolesByType('landmark');
	const role = axe.commons.aria.getRole(actualNode);
	const nodeName = actualNode.nodeName.toUpperCase();

	if (nodeName === 'HEADER' || nodeName === 'FOOTER') {
		return isHeaderFooterLandmark(virtualNode);
	}

	if (nodeName === 'SECTION' || nodeName === 'FORM') {
		const label = axe.commons.aria.labelVirtual(virtualNode);
		return !!label;
	}

	return (role && landmarkRoles.indexOf(role) >= 0) || role === 'region';
}

return isLandmarkVirtual(virtualNode) && axe.commons.dom.isVisible(node, true);
