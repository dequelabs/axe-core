
var label = node.ownerDocument.querySelector('label[for="' + kslib.utils.escapeSelector(node.id) + '"]');
if (label) {
	return !!kslib.text.accessibleText(label);
}
return false;
