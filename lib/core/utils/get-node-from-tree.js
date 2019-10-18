// TODO: axe._cache

/**
 * Return a single node from the virtual dom tree
 *
 * @param {Object} vNode The flattened, virtual DOM tree
 * @param {Node}   node  The HTML DOM node
 */
function getNodeFromTree(vNode, node) {
	const el = node || vNode;
	return axe._cache.get('nodeMap') ? axe._cache.get('nodeMap').get(el) : null;
}

export default getNodeFromTree;
