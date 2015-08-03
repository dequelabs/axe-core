var child,
	bad = [],
	children = node.childNodes,
	hasNonEmptyTextNode = false;

for (var i = 0; i < children.length; i++) {
	child = children[i];
	if (child.nodeType === 1 && (child.nodeName !== 'DT' && child.nodeName !== 'DD'&&
		child.nodeName !== 'SCRIPT' && child.nodeName !== 'TEMPLATE')) {
		bad.push(child);
	} else if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
		hasNonEmptyTextNode = true;
	}
}
if (bad.length) {
	this.relatedNodes(bad);
}

var retVal = !!bad.length || hasNonEmptyTextNode;
return retVal;
