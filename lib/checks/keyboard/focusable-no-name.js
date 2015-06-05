var tabIndex = node.getAttribute('tabindex'),
	isFocusable = kslib.dom.isFocusable(node) && tabIndex > -1;
if (!isFocusable) {
	return false;
}
return !kslib.text.accessibleText(node);
