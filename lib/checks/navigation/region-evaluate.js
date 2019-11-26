import {
	implicitNodes,
	getRolesByType,
	labelVirtual
} from '../../commons/aria';
import {
	isSkipLink,
	getElementByReference,
	isVisible,
	hasContent
} from '../../commons/dom';
import { sanitize } from '../../commons/text';
import { matchesSelector } from '../../core/utils';

const landmarkRoles = getRolesByType('landmark');

// Create a list of nodeNames that have a landmark as an implicit role
const implicitLandmarks = landmarkRoles
	.reduce((arr, role) => arr.concat(implicitNodes(role)), [])
	.filter(r => r !== null);

// Check if the current element is a landmark
function isRegion(virtualNode) {
	const node = virtualNode.actualNode;
	const explicitRole = getRole(node, { noImplicit: true });
	const ariaLive = (node.getAttribute('aria-live') || '').toLowerCase().trim();

	if (explicitRole) {
		return explicitRole === 'dialog' || landmarkRoles.includes(explicitRole);
	}
	// Ignore content inside of aria-live
	if (['assertive', 'polite'].includes(ariaLive)) {
		return true;
	}

	// Check if the node matches any of the CSS selectors of implicit landmarks
	return implicitLandmarks.some(implicitSelector => {
		let matches = matchesSelector(node, implicitSelector);
		if (node.nodeName.toUpperCase() === 'FORM') {
			let titleAttr = node.getAttribute('title');
			let title =
				titleAttr && titleAttr.trim() !== ''
					? sanitize(titleAttr)
					: null;
			return matches && (!!labelVirtual(virtualNode) || !!title);
		}
		return matches;
	});
}

/**
 * Find all visible elements not wrapped inside a landmark or skiplink
 */
function findRegionlessElms(virtualNode) {
	const node = virtualNode.actualNode;
	// End recursion if the element is a landmark, skiplink, or hidden content
	if (
		isRegion(virtualNode) ||
		(isSkipLink(virtualNode.actualNode) &&
			getElementByReference(virtualNode.actualNode, 'href')) ||
		!isVisible(node, true)
	) {
		return [];

		// Return the node is a content element
	} else if (hasContent(node, /* noRecursion: */ true)) {
		return [node];

		// Recursively look at all child elements
	} else {
		return virtualNode.children
			.filter(({ actualNode }) => actualNode.nodeType === 1)
			.map(findRegionlessElms)
			.reduce((a, b) => a.concat(b), []); // flatten the results
	}
}

function regionEvaluate(node, options, virtualNode, context) {
	var regionlessNodes = findRegionlessElms(virtualNode);
	this.relatedNodes(regionlessNodes);

	return regionlessNodes.length === 0;
}

export default regionEvaluate;