if (node.getAttribute('id')) {
	const root = axe.commons.dom.getRootNode(node);
	const id = axe.commons.utils.escapeSelector(node.getAttribute('id'));
	const label = root.querySelector(`label[for="${id}"]`);

	if (label && !axe.commons.dom.isVisible(label)) {
		return true;
	}
}
return false;
