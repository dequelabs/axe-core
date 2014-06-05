var children = node.children;
if (children.length === 0) { return false; }

for (var i = 0; i < children.length; i++) {
	if (children[i].nodeName !== 'DT' && children[i].nodeName !== 'DD') { return true; }
}

return false;

