import { findUpVirtual, isVisible } from '../commons/dom';
import { getRolesByType, getRole } from '../commons/aria';
import { accessibleTextVirtual } from '../commons/text';

function landmarkUniqueMatches(node, virtualNode) {
	/*
	 * Since this is a best-practice rule, we are filtering elements as dictated by ARIA 1.1 Practices regardless of treatment by browser/AT combinations.
	 *
	 * Info: https://www.w3.org/TR/wai-aria-practices-1.1/#aria_landmark
	 */
	var excludedParentsForHeaderFooterLandmarks = [
		'article',
		'aside',
		'main',
		'nav',
		'section'
	].join(',');
	function isHeaderFooterLandmark(headerFooterElement) {
		return !findUpVirtual(
			headerFooterElement,
			excludedParentsForHeaderFooterLandmarks
		);
	}

	function isLandmarkVirtual(virtualNode) {
		var { actualNode } = virtualNode;
		var landmarkRoles = getRolesByType('landmark');
		var role = getRole(actualNode);
		if (!role) {
			return false;
		}

		var nodeName = actualNode.nodeName.toUpperCase();
		if (nodeName === 'HEADER' || nodeName === 'FOOTER') {
			return isHeaderFooterLandmark(virtualNode);
		}

		if (nodeName === 'SECTION' || nodeName === 'FORM') {
			var accessibleText = accessibleTextVirtual(virtualNode);
			return !!accessibleText;
		}

		return landmarkRoles.indexOf(role) >= 0 || role === 'region';
	}

	return isLandmarkVirtual(virtualNode) && isVisible(node, true);
}

export default landmarkUniqueMatches;
