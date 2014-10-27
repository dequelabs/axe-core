var nodeName = node.nodeName,
	nodeType = node.type;
if (nodeName === 'INPUT') {
	return ['hidden', 'range', 'color', 'checkbox', 'radio'].indexOf(nodeType) === -1;
}

if (nodeName === 'SELECT') {
	return !!node.options.length;
}

if (nodeName === 'TEXTAREA') {
	return true;
}

if (nodeName === 'OPTION') {
	return false;
}

if (kslib.text.visible(node, false, true) === '') {
	return false;
}

var range = node.ownerDocument.createRange(),
	childNodes = node.childNodes,
	length = childNodes.length,
	child, index;

for (index = 0; index < length; index++) {
	child = childNodes[index];

	if (child.nodeType === 3 && kslib.text.sanitize(child.nodeValue) !== '') {
		range.selectNodeContents(child);
	}
}

var rects = range.getClientRects();
length = rects.length;

for (index = 0; index < length; index++) {
	//check to see if the rectangle impinges
	if (kslib.dom.visuallyOverlaps(rects[index], node)) {
		return true;
	}
}

return false;
