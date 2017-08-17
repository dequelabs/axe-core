var bad = [],
	permitted = ['STYLE', 'META', 'LINK', 'MAP', 'AREA', 'SCRIPT', 'DATALIST', 'TEMPLATE'],
	hasNonEmptyTextNode = false;

virtualNode.children.forEach(({ actualNode }) => {
	var nodeName = actualNode.nodeName.toUpperCase();
	if (actualNode.nodeType === 1 && nodeName !== 'DT' && nodeName !== 'DD' && permitted.indexOf(nodeName) === -1) {
		bad.push(actualNode);
	} else if (actualNode.nodeType === 3 && actualNode.nodeValue.trim() !== '') {
		hasNonEmptyTextNode = true;
	}
});

if (bad.length) {
	this.relatedNodes(bad);
}

var retVal = !!bad.length || hasNonEmptyTextNode;
return retVal;
