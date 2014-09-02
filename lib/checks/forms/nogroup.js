if (!node.name) { return false; }

// No group exists; there's only one element
var matchingNodes = node.ownerDocument.querySelectorAll('input[type="' + options + '"][name="' +
	kslib.utils.escapeSelector(node.name) + '"]');

if (matchingNodes.length <= 1) { return true; }
return false;
