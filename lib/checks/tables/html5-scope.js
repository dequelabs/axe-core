
if (!commons.dom.isHTML5(node.ownerDocument)) {
	return false;
}

return node.nodeName === 'TH';