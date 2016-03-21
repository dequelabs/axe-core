// Since empty ID's are not meaningful and are ignored by Edge, we'll
// let those pass.
if (!node.id.trim()) {
	return true;
}

var matchingNodes = document.querySelectorAll('[id="' + axe.commons.utils.escapeSelector(node.id) + '"]');
var related = [];
for (var i = 0; i < matchingNodes.length; i++) {
	if (matchingNodes[i] !== node) {
		related.push(matchingNodes[i]);
	}
}
if (related.length) {
	this.relatedNodes(related);
}
this.data(node.getAttribute('id'));

return (matchingNodes.length <= 1);
