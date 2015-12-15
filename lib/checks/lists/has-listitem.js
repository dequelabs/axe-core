var children = node.children;
if (children.length === 0) { return true; }

for (var i = 0; i < children.length; i++) {
	if (children[i].nodeName.toUpperCase() === 'LI') { return false; }
}

return true;

