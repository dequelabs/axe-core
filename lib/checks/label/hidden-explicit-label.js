if (node.getAttribute('id')) {
	const root = axe.commons.dom.getRootNode(node);
	const id = axe.commons.utils.escapeSelector(node.getAttribute('id'));
	const label = root.querySelector(`label[for="${id}"]`);
	const isLabelVisible = label && axe.commons.dom.isVisible(label);

	if (isLabelVisible === false) {
		const name = axe.commons.text.accessibleTextVirtual(virtualNode).trim();
		const isNameEmpty = name === '';
		return isNameEmpty;
	}
}
return false;
