const { dom, aria } = axe.commons;

// Return the skplink, if any
function getSkiplink (virtualNode) {
	const firstLink = axe.utils.querySelectorAll(virtualNode, 'a[href]')[0];
	if (firstLink && axe.commons.dom.getElementByReference(firstLink.actualNode, 'href')) {
		return firstLink.actualNode;
	}
}

const skipLink = getSkiplink(virtualNode);
const landmarkRoles = aria.getRolesByType('landmark');

// Create a list of nodeNames that have a landmark as an implicit role
const implicitLandmarks = landmarkRoles
	.reduce((arr, role) => arr.concat(aria.implicitNodes(role)), [])
	.filter(r => r !== null).map(r => r.toUpperCase());

// Check if the current element is the skiplink
function isSkipLink (node) {
	return skipLink && skipLink === node;
}

// Check if the current element is a landmark
function isLandmark (node) {
	if (node.hasAttribute('role')) {
		return landmarkRoles.includes(node.getAttribute('role').toLowerCase());
	} else {
		return implicitLandmarks.includes(node.nodeName.toUpperCase());
	}
}

/**
 * Find all visible elements not wrapped inside a landmark or skiplink
 */
function findRegionlessElms (virtualNode) {
	const node = virtualNode.actualNode;
	// End recursion if the element is a landmark, skiplink, or hidden content
	if (isLandmark(node) || isSkipLink(node) || !dom.isVisible(node, true)) {
		return [];

	// Return the node is a content element
	} else if (dom.hasContent(node, /* noRecursion: */ true)) {
		return [node];
	
	// Recursively look at all child elements
	} else {
		return virtualNode.children.filter(({ actualNode }) => actualNode.nodeType === 1)
			.map(findRegionlessElms)
			.reduce((a, b) => a.concat(b), []); // flatten the results
	}
}

var regionlessNodes = findRegionlessElms(virtualNode);
this.relatedNodes(regionlessNodes);

return regionlessNodes.length === 0;
