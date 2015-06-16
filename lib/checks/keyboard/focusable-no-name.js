var tabIndex = node.getAttribute('tabindex'),
	isFocusable = commons.dom.isFocusable(node) && tabIndex > -1;
if (!isFocusable) {
	return false;
}
return !commons.text.accessibleText(node);
