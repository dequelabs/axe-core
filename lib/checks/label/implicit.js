
var label = commons.dom.findUp(node, 'label');
if (label) {
	return !!commons.text.accessibleText(label);
}
return false;
