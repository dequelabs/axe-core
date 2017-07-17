if (node.id) {
  const root = axe.commons.dom.getRootNode(node);
	const label = root.querySelector('label[for="' + axe.commons.utils.escapeSelector(node.id) + '"]');
	if (label) {
		return !!axe.commons.text.accessibleText(label);
	}
}
return false;
