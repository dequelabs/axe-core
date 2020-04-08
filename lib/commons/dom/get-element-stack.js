import { createGrid, getRectStack } from './get-rect-stack';

/**
 * Return all elements that are at the center bounding rect of the passed in node.
 * @method getElementStack
 * @memberof axe.commons.dom
 * @param {Node} node
 * @return {Node[]}
 */
function getElementStack(node) {
	// TODO: es-module-_cache
	if (!axe._cache.get('gridCreated')) {
		createGrid();
		axe._cache.set('gridCreated', true);
	}

	// TODO: es-module-utils.getNodeFromTree
	const vNode = axe.utils.getNodeFromTree(node);
	const grid = vNode._grid;

	if (!grid) {
		return [];
	}

	return getRectStack(grid, vNode.boundingClientRect);
}

export default getElementStack;
