var children = node.children;
if (children.length === 0) { return true; }

var hasDt = false;
for (var i = 0; i < children.length; i++) {
	if (children[i].nodeName === 'DT') { hasDt = true; }
	if (hasDt && children[i].nodeName === 'DD') { return false; }
}

return true;
