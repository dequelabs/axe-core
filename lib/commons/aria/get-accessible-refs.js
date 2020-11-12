import getRootNode from '../dom/get-root-node';
import cache from '../../core/base/cache';
import cacheIdRefs from './cache-idrefs';

/**
 * Return all DOM nodes that use the nodes ID in the accessibility tree.
 * @param {Element} node
 * @returns {Element[]}
 */
function getAccessibleRefs(node) {
	node = node.actualNode || node;
	let root = getRootNode(node);
	root = root.documentElement || root; // account for shadow roots
	const id = node.id;

	// because axe.commons is not available in axe.utils, we can't do
	// this caching when we build up the virtual tree
	if (!cache.get('idRefs')) {
		cacheIdRefs(root);
	}

	return cache.get('idRefs')[id] || [];
}

export default getAccessibleRefs;
