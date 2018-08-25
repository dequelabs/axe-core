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
	node = node.actualNode || node;
	let root = dom.getRootNode(node);
	root = root.documentElement || root; // account for shadow roots
	const id = node.id;

	// Get all idref(s) attributes on the lookup table
	const refAttrs = Object.keys(aria.lookupTable.attributes).filter(attr => {
		const { type } = aria.lookupTable.attributes[attr];
		return /^idrefs?$/.test(type);
	});

	// Find the first element that IDREF(S) the node
	let refElm = findDomNode(root, elm => {
		if (elm.nodeType !== 1) {
			// Elements only
			return;
		}
		if (
			elm.nodeName.toUpperCase() === 'LABEL' &&
			elm.getAttribute('for') === id
		) {
			return true;
		}
		// See if there are any aria attributes that reference the node
		return refAttrs.filter(attr => elm.hasAttribute(attr)).some(attr => {
			const attrValue = elm.getAttribute(attr);
			if (aria.lookupTable.attributes[attr].type === 'idref') {
				return attrValue === id;
			}
			return axe.utils.tokenList(attrValue).includes(id);
		});
	});
	return typeof refElm !== 'undefined';
};
