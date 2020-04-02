/* global dom */
import lookupTable from './lookup-table';

const idRefsRegex = /^idrefs?$/;

function cacheIdRefs(node, refAttrs) {
	if (node.hasAttribute) {
		// TODO: es-module-_cache
		const idRefs = axe._cache.get('idRefs');

		if (node.nodeName.toUpperCase() === 'LABEL' && node.hasAttribute('for')) {
			idRefs[node.getAttribute('for')] = true;
		}

		for (let i = 0; i < refAttrs.length; ++i) {
			const attr = refAttrs[i];

			if (!node.hasAttribute(attr)) {
				continue;
			}

			const attrValue = node.getAttribute(attr);

			// TODO: es-module-utils.tokenList
			const tokens = axe.utils.tokenList(attrValue);

			for (let k = 0; k < tokens.length; ++k) {
				idRefs[tokens[k]] = true;
			}
		}
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
function isAccessibleRef(node) {
	node = node.actualNode || node;
	// TODO: es-module-dom.getRootNode
	let root = dom.getRootNode(node);
	root = root.documentElement || root; // account for shadow roots
	const id = node.id;

	// because axe.commons is not available in axe.utils, we can't do
	// this caching when we build up the virtual tree
	// TODO: es-module-_cache
	if (!axe._cache.get('idRefs')) {
		axe._cache.set('idRefs', {});
		// Get all idref(s) attributes on the lookup table
		const refAttrs = Object.keys(lookupTable.attributes).filter(attr => {
			const { type } = lookupTable.attributes[attr];
			return idRefsRegex.test(type);
		});

		cacheIdRefs(root, refAttrs);
	}

	// TODO: es-module-_cache
	return axe._cache.get('idRefs')[id] === true;
}

export default isAccessibleRef;
