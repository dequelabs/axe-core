this.data({
	name: node.getAttribute('name'),
	type: node.getAttribute('type')
});

var matchingNodes = document.querySelectorAll('input[type="' +
	axe.commons.utils.escapeSelector(node.type) + '"][name="' + axe.commons.utils.escapeSelector(node.name) + '"]');
if (matchingNodes.length <= 1) {
	return true;
}

// Check to see if there's an aria-labelledby value that all nodes have in common
return [].map.call(matchingNodes, function (m) {
	var l = m.getAttribute('aria-labelledby');
	return l ? l.split(/\s+/) : [];
}).reduce(function (prev, curr) {
	return prev.filter(function (n) {
		return curr.indexOf(n) !== -1;
	});
}).filter(function (n) {
	var labelNode = document.getElementById(n);
	return labelNode && axe.commons.text.accessibleText(labelNode);
}).length !== 0;
