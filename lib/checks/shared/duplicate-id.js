// Since empty ID's are not meaningful and are ignored by Edge, we'll
// let those pass.
if (!node.getAttribute('id').trim()) {
	return true;
}

const id = axe.commons.utils.escapeSelector(node.getAttribute('id'));
var matchingNodes = document.querySelectorAll(`[id="${id}"]`);
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
