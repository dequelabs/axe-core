
var label = axe.commons.dom.findUp(node, 'label');
if (label) {
	return !!axe.commons.text.accessibleText(label);
}
return false;
