var child,
	nodeName,
	bad = [],
	children = node.childNodes,
	hasNonEmptyTextNode = false;

for (var i = 0; i < children.length; i++) {
	child = children[i];
	nodeName = child.nodeName.toUpperCase();
	if (child.nodeType === 1 && nodeName !== 'LI' && nodeName !== 'SCRIPT' && nodeName !== 'TEMPLATE') {
		bad.push(child);
	} else if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
		hasNonEmptyTextNode = true;
	}
}
if (bad.length) {
	this.relatedNodes(bad);
}

return !!bad.length || hasNonEmptyTextNode;
