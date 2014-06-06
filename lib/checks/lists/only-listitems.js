var children = node.children;
if (children.length === 0) { return false; }

for (var i = 0; i < children.length; i++) {
	if (children[i].nodeName !== 'LI') { return true; }
}

return false;


