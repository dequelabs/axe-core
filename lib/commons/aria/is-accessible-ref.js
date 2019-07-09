/* global aria, axe, dom */
const idRefsRegex = /^idrefs?$/;

function cacheIdRefs(node, refAttrs) {
	if (node.hasAttribute) {
		if (node.nodeName.toUpperCase() === 'LABEL' && node.hasAttribute('for')) {
			axe._cache.get('idRefs')[node.getAttribute('for')] = true;
		}

		refAttrs
			.filter(attr => node.hasAttribute(attr))
			.forEach(attr => {
				const attrValue = node.getAttribute(attr);
				axe.utils.tokenList(attrValue).forEach(id => {
					axe._cache.get('idRefs')[id] = true;
				});
			});
	}

	for (let i = 0; i < node.children.length; i++) {
		cacheIdRefs(node.children[i], refAttrs);
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

	// because axe.commons is not available in axe.utils, we can't do
	// this caching when we build up the virtual tree
	if (!axe._cache.get('idRefs')) {
		axe._cache.set('idRefs', {});
		// Get all idref(s) attributes on the lookup table
		const refAttrs = Object.keys(aria.lookupTable.attributes).filter(attr => {
			const { type } = aria.lookupTable.attributes[attr];
			return idRefsRegex.test(type);
		});

		cacheIdRefs(root, refAttrs);
	}

	return axe._cache.get('idRefs')[id] === true;
};
