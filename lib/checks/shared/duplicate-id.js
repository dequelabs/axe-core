const { aria, dom, utils } = axe.commons;
const id = node.getAttribute('id').trim();
const { accReferred } = options || {};

// Since empty ID's are not meaningful and are ignored by Edge, we'll
// let those pass.
if (
	!id ||
	(typeof accReferred === 'boolean' &&
		accReferred === !aria.isAccessibleRef(node))
) {
	return true;
}

const root = dom.getRootNode(node);
const matchingNodes = Array.from(
	root.querySelectorAll(`[id="${utils.escapeSelector(id)}"]`)
).filter(foundNode => foundNode !== node);

if (matchingNodes.length) {
	this.relatedNodes(matchingNodes);
}
this.data(id);

return matchingNodes.length === 0;
