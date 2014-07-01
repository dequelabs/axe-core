
var label = kslib.dom.findUp(node, 'label');
return !!(label ? kslib.text.sanitize(label.innerText).trim() : '');
