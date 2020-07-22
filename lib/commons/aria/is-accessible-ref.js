import standards from '../../standards';
import getRootNode from '../dom/get-root-node';
import cache from '../../core/base/cache';
import { tokenList } from '../../core/utils';

const idRefsRegex = /^idrefs?$/;

function cacheIdRefs(node, refAttrs) {
	if (node.hasAttribute) {
		const idRefs = cache.get('idRefs');

		if (node.nodeName.toUpperCase() === 'LABEL' && node.hasAttribute('for')) {
			idRefs[node.getAttribute('for')] = true;
		}

		for (let i = 0; i < refAttrs.length; ++i) {
			const attr = refAttrs[i];

			if (!node.hasAttribute(attr)) {
				continue;
			}

			const attrValue = node.getAttribute(attr);

			const tokens = tokenList(attrValue);

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
	let root = getRootNode(node);
	root = root.documentElement || root; // account for shadow roots
	const id = node.id;

	// because axe.commons is not available in axe.utils, we can't do
	// this caching when we build up the virtual tree
	if (!cache.get('idRefs')) {
		cache.set('idRefs', {});
		// Get all idref(s) attributes on the lookup table
		const refAttrs = Object.keys(standards.ariaAttrs).filter(attr => {
			const { type } = standards.ariaAttrs[attr];
			return idRefsRegex.test(type);
		});

		cacheIdRefs(root, refAttrs);
	}

	return cache.get('idRefs')[id] === true;
}

export default isAccessibleRef;
