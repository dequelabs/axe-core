const { dom, utils } = axe.commons;
const id = node.getAttribute('id').trim();
const root = dom.getRootNode(node);

// Since empty ID's are not meaningful and are ignored by Edge, we'll
// let those pass.
if (!id) {
	return true;
}

const matchingNodes = Array.from(
	root.querySelectorAll(`[id="${utils.escapeSelector(id)}"]`)
).filter(foundNode => foundNode !== node);

if (matchingNodes.length) {
	this.relatedNodes(matchingNodes);
}
this.data(id);

return matchingNodes.length === 0;
