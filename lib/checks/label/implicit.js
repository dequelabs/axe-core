
var label = kslib.dom.findUp(node, 'label');
if (label) {
	return !!kslib.text.accessibleText(label);
}
return false;
