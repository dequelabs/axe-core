const { dom, text } = axe.commons;

var label = dom.findUpVirtual(virtualNode, 'label');
if (label) {
	console.log(label);
	return !!text.accessibleText(label, { inControlContext: true });
}
return false;
