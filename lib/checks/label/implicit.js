
var label = kslib.dom.findUp(node, 'label');
return !!(label ? kslib.text.visible(label) : '');
