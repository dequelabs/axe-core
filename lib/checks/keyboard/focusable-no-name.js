var tabIndex = node.getAttribute('tabindex'),
	isFocusable = axe.commons.dom.isFocusable(node) && tabIndex > -1;
if (!isFocusable) {
	return false;
}
return !axe.commons.text.accessibleText(node);
