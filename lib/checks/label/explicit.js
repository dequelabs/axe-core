if (node.id) {
	var label = document.querySelector('label[for="' + axe.commons.utils.escapeSelector(node.id) + '"]');
	if (label) {
		return !!axe.commons.text.accessibleText(label);
	}
}
return false;
