var children = node.childNodes;
if (children.length === 0) { return false; }

for (var i = 0; i < children.length; i++) {
	if (children[i].nodeType === 1 && children[i].nodeName !== 'LI') { return true; }
	if (children[i].nodeType === 3 && children[i].nodeValue.trim() !== '') { return true; }
}

return false;


