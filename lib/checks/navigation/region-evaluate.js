const { dom, aria } = axe.commons;
const landmarkRoles = aria.getRolesByType('landmark');

// Create a list of nodeNames that have a landmark as an implicit role
const implicitLandmarks = landmarkRoles
	.reduce((arr, role) => arr.concat(aria.implicitNodes(role)), [])
	.filter(r => r !== null);

// Check if the current element is a landmark
function isRegion(virtualNode) {
	const node = virtualNode.actualNode;
	const explicitRole = axe.commons.aria.getRole(node, { noImplicit: true });
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
		let matches = axe.utils.matchesSelector(node, implicitSelector);
		if (node.nodeName.toUpperCase() === 'FORM') {
			let titleAttr = node.getAttribute('title');
			let title =
				titleAttr && titleAttr.trim() !== ''
					? axe.commons.text.sanitize(titleAttr)
					: null;
			return matches && (!!aria.labelVirtual(virtualNode) || !!title);
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
		(dom.isSkipLink(virtualNode.actualNode) &&
			dom.getElementByReference(virtualNode.actualNode, 'href')) ||
		!dom.isVisible(node, true)
	) {
		return [];

		// Return the node is a content element
	} else if (dom.hasContent(node, /* noRecursion: */ true)) {
		return [node];

		// Recursively look at all child elements
	} else {
		return virtualNode.children
			.filter(({ actualNode }) => actualNode.nodeType === 1)
			.map(findRegionlessElms)
			.reduce((a, b) => a.concat(b), []); // flatten the results
	}
}

var regionlessNodes = findRegionlessElms(virtualNode);
this.relatedNodes(regionlessNodes);

return regionlessNodes.length === 0;
