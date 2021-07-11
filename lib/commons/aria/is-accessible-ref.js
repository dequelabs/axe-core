import getAccessibleRefs from './get-accessible-refs';

/**
 * Check that a DOM node is a reference in the accessibility tree
 * @param {Element} node
 * @returns {Boolean}
 */
function isAccessibleRef(node) {
	node = node.actualNode || node;
	let root = getRootNode(node);
	root = root.documentElement || root; // account for shadow roots
	const id = node.id;

	// because axe.commons is not available in axe.utils, we can't do
	// this caching when we build up the virtual tree
	if (!cache.get('idRefs')) {
		cache.set('idRefs', {});
		// Get all idref(s) attributes on the lookup table
		const refAttrs = Object.keys(lookupTable.attributes).filter(attr => {
			const { type } = lookupTable.attributes[attr];
			return idRefsRegex.test(type);
		});

		cacheIdRefs(root, refAttrs);
	}

	return cache.get('idRefs')[id] === true;
}

export default isAccessibleRef;
