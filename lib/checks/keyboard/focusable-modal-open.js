const tabbableElements = virtualNode.tabbableElements.map(
	({ actualNode }) => actualNode
);

if (!tabbableElements || !tabbableElements.length) {
	return true;
}

this.relatedNodes(tabbableElements);

if (axe.commons.dom.isModalOpen()) {
	return undefined;
}

return true;
