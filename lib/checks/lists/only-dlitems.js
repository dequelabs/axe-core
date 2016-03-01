var child,
	nodeName,
	bad = [],
	children = node.childNodes,
	permitted = ['STYLE', 'META', 'LINK', 'MAP', 'AREA', 'SCRIPT', 'DATALIST', 'TEMPLATE'],
	hasNonEmptyTextNode = false;

for (var i = 0; i < children.length; i++) {
	child = children[i];
	var nodeName = child.nodeName.toUpperCase();
	if (child.nodeType === 1 && nodeName !== 'DT' && nodeName !== 'DD' && permitted.indexOf(nodeName) === -1) {
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
