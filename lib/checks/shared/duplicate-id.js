var matchingNodes = node.ownerDocument.querySelectorAll('[id=' + kslib.utils.escapeSelector(node.id) + ']');
var related = [];
for (var i = 0; i < matchingNodes.length; i++) {
	if (matchingNodes[i] !== node) { related.push(matchingNodes[i]); }
}
if (related.length) {
	this.relatedNodes(related);
}
this.data(node.id);

return (matchingNodes.length <= 1);
