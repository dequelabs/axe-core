import { createGrid, getRectStack } from './get-rect-stack';
import sanitize from '../text/sanitize';

/**
 * Return all elements that are at the center of each text client rect of the passed in node.
 * @method getTextElementStack
 * @memberof axe.commons.dom
 * @param {Node} node
 * @return {Array<Node[]>}
 */
function getTextElementStack(node) {
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

	// for code blocks that use syntax highlighting, you can get a ton of client
	// rects (See https://github.com/dequelabs/axe-core/issues/1985). they use
	// a mixture of text nodes and other nodes (which will contain their own text
	// nodes), but all we care about is checking the direct text nodes as the
	// other nodes will have their own client rects checked. doing this speeds up
	// color contrast significantly for large syntax highlighted code blocks
	const clientRects = [];
	Array.from(node.childNodes).forEach(elm => {
		if (elm.nodeType === 3 && sanitize(elm.textContent) !== '') {
			const range = document.createRange();
			range.selectNodeContents(elm);
			const rects = range.getClientRects();

			for (let i = 0; i < rects.length; i++) {
				const rect = rects[i];

				// filter out 0 width and height rects (newline characters)
				// ie11 has newline characters return 0.00998, so we'll say if the
				// line is < 1 it shouldn't be counted
				if (rect.width >= 1 && rect.height >= 1) {
					clientRects.push(rect);
				}
			}
		}
	});

	return clientRects.map(rect => {
		return getRectStack(grid, rect);
	});
}

export default getTextElementStack;
