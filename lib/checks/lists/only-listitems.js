var child,
	bad = [],
	children = node.childNodes,
	hasNonEmptyTextNode = false;

for (var i = 0; i < children.length; i++) {
	child = children[i];
	if (child.nodeType === 1 && ['LI', 'SCRIPT', 'TEMPLATE']
				.indexOf(child.nodeName.toUpperCase()) === -1) {
		bad.push(child);
	} else if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
		hasNonEmptyTextNode = true;
	}
}
if (bad.length) {
	this.relatedNodes(bad);
}

return !!bad.length || hasNonEmptyTextNode;
