
var label = document.querySelector('label[for="' + commons.utils.escapeSelector(node.id) + '"]');
if (label) {
	return !!commons.text.accessibleText(label);
}
return false;
