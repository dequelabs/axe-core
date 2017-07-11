if (node.getAttribute('id')) {
	const id = axe.commons.utils.escapeSelector(node.getAttribute('id'));
	const label = document.querySelector(`label[for="${id}"]`);

	if (label) {
		return !!axe.commons.text.accessibleText(label);
	}
}
return false;
