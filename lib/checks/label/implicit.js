
var label = axe.commons.dom.findUpVirtual(virtualNode, 'label');
if (label) {
	return !!axe.commons.text.accessibleText(label);
}
return false;
