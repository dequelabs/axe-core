var children = node.children;
if ( !children || !children.length) { return false; }

var hasDt = false, hasDd = false;
for (var i = 0; i < children.length; i++) {
	if (children[i].nodeName === 'DT') { hasDt = true; }
	if (hasDt && children[i].nodeName === 'DD') { return false; }
	if (children[i].nodeName === 'DD') { hasDd = true; }
}

return hasDt || hasDd;
