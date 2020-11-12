import cache from '../../core/base/cache';
import { tokenList } from '../../core/utils';
import standards from '../../standards';
import { sanitize } from '../text/';

const idRefsRegex = /^idrefs?$/;

/**
 * Cache all nodes that reference ids using an accessible reference.
 */
function cacheIdRefs(node, refAttrs) {
	let idRefs = cache.get('idRefs');
	if (!idRefs) {
		idRefs = {};
		cache.set('idRefs', idRefs);
	}

	if (!refAttrs) {
		refAttrs = Object.keys(standards.ariaAttrs).filter(attr => {
			const { type } = standards.ariaAttrs[attr];
			return idRefsRegex.test(type);
		});
	}

	if (node.hasAttribute) {
		if (node.nodeName.toUpperCase() === 'LABEL' && node.hasAttribute('for')) {
			idRefs[node.getAttribute('for')] = idRefs[node.getAttribute('for')] || [];
			idRefs[node.getAttribute('for')].push(node);
		}

		for (let i = 0; i < refAttrs.length; ++i) {
			const attr = refAttrs[i];

			if (!sanitize(node.getAttribute(attr) || '')) {
				continue;
			}

			const attrValue = node.getAttribute(attr);

			const tokens = tokenList(attrValue);

			for (let k = 0; k < tokens.length; ++k) {
				idRefs[tokens[k]] = idRefs[tokens[k]] || [];
				idRefs[tokens[k]].push(node);
			}
		}
	}

	for (let i = 0; i < node.children.length; i++) {
		cacheIdRefs(node.children[i], refAttrs);
	}
}
export default cacheIdRefs;
