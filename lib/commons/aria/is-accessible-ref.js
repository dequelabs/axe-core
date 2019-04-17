/* global aria, axe, dom */
function findDomNode(node, functor) {
	if (functor(node)) {
		return node;
	}
	for (let i = 0; i < node.children.length; i++) {
		const out = findDomNode(node.children[i], functor);
		if (out) {
			return out;
		}
	}
}

/**
 * Check that a DOM node is a reference in the accessibility tree
 * @param {Element} node
 * @returns {Boolean}
 */
aria.isAccessibleRef = function isAccessibleRef(node) {


	// if while we generated the virtual node for each node we looked at
	// the attributes of the node to see if it had any idref type attributes,
	// we could store all those ids into a map and then this function would
	// just have to look up the info in the map instead of the entire tree

	node = node.actualNode || node;
	const id = node.id;

	return typeof axe._idRefCache[id] !== 'undefined';
};
