if (!node.name) { return false; }
var matchingNodes = node.ownerDocument.querySelectorAll('input[type=' + options + '][name=' + node.name + ']');
if (matchingNodes.length <= 1) { return false; }

// Check to see if there's an aria-labelledby value that all nodes have in common
return [].map.call(matchingNodes, function (m) {
	var l = m.getAttribute('aria-labelledby');
	return l ? l.split(/\s+/) : [];
}).reduce(function (prev, curr) {
	return prev.filter(function (n) { return curr.indexOf(n) !== -1; });
}).filter(function (n) {
    var labelNode = node.ownerDocument.getElementById(n);
    return labelNode && labelNode.textContent.trim() !== '';
}).length !== 0;
