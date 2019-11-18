/* global dom */

// split the page cells to group elements by the position
const gridSize = 200; // arbitrary size, increase to reduce memory (less cells) use but increase time (more nodes per grid to check collision)

/**
 * Determine if node produces a stacking context.
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 * https://github.com/gwwar/z-context/blob/master/devtools/index.js
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function isStackingContext(vNode) {
	const node = vNode.actualNode;

	//the root element (HTML)
	if (
		!node ||
		node.nodeName === 'HTML' ||
		node.nodeName === '#document-fragment'
	) {
		return true;
	}

	// position: fixed or sticky
	if (
		vNode.getComputedStylePropertyValue('position') === 'fixed' ||
		vNode.getComputedStylePropertyValue('position') === 'sticky'
	) {
		return true;
	}

	// positioned (absolutely or relatively) with a z-index value other than "auto",
	if (
		vNode.getComputedStylePropertyValue('z-index') !== 'auto' &&
		vNode.getComputedStylePropertyValue('position') !== 'static'
	) {
		return true;
	}

	// elements with an opacity value less than 1.
	if (vNode.getComputedStylePropertyValue('opacity') !== '1') {
		return true;
	}

	// elements with a transform value other than "none"
	const transform =
		vNode.getComputedStylePropertyValue('-webkit-transform') ||
		vNode.getComputedStylePropertyValue('-ms-transform') ||
		vNode.getComputedStylePropertyValue('transform') ||
		'none';

	if (transform !== 'none') {
		return true;
	}

	// elements with a mix-blend-mode value other than "normal"
	if (
		vNode.getComputedStylePropertyValue('mix-blend-mode') &&
		vNode.getComputedStylePropertyValue('mix-blend-mode') !== 'normal'
	) {
		return true;
	}

	// elements with a filter value other than "none"
	if (
		vNode.getComputedStylePropertyValue('filter') &&
		vNode.getComputedStylePropertyValue('filter') !== 'none'
	) {
		return true;
	}

	// elements with a perspective value other than "none"
	if (
		vNode.getComputedStylePropertyValue('perspective') &&
		vNode.getComputedStylePropertyValue('perspective') !== 'none'
	) {
		return true;
	}

	// element with a clip-path value other than "none"
	if (
		vNode.getComputedStylePropertyValue('clip-path') &&
		vNode.getComputedStylePropertyValue('clip-path') !== 'none'
	) {
		return true;
	}

	// element with a mask value other than "none"
	const mask =
		vNode.getComputedStylePropertyValue('-webkit-mask') ||
		vNode.getComputedStylePropertyValue('mask') ||
		'none';

	if (mask !== 'none') {
		return true;
	}

	// element with a mask-image value other than "none"
	const maskImage =
		vNode.getComputedStylePropertyValue('-webkit-mask-image') ||
		vNode.getComputedStylePropertyValue('mask-image') ||
		'none';

	if (maskImage !== 'none') {
		return true;
	}

	// element with a mask-border value other than "none"
	const maskBorder =
		vNode.getComputedStylePropertyValue('-webkit-mask-border') ||
		vNode.getComputedStylePropertyValue('mask-border') ||
		'none';

	if (maskBorder !== 'none') {
		return true;
	}

	// elements with isolation set to "isolate"
	if (vNode.getComputedStylePropertyValue('isolation') === 'isolate') {
		return true;
	}

	// transform or opacity in will-change even if you don't specify values for these attributes directly
	if (
		vNode.getComputedStylePropertyValue('will-change') === 'transform' ||
		vNode.getComputedStylePropertyValue('will-change') === 'opacity'
	) {
		return true;
	}

	// elements with -webkit-overflow-scrolling set to "touch"
	if (
		vNode.getComputedStylePropertyValue('-webkit-overflow-scrolling') ===
		'touch'
	) {
		return true;
	}

	// element with a contain value of "layout" or "paint" or a composite value
	// that includes either of them (i.e. contain: strict, contain: content).
	const contain = vNode.getComputedStylePropertyValue('contain');
	if (['layout', 'paint', 'strict', 'content'].includes(contain)) {
		return true;
	}

	// a flex item or gird item with a z-index value other than "auto", that is the parent element display: flex|inline-flex|grid|inline-grid,
	if (
		vNode.getComputedStylePropertyValue('z-index') !== 'auto' &&
		vNode.parent
	) {
		const parentDsiplay = vNode.parent.getComputedStylePropertyValue('display');
		if (
			[
				'flex',
				'inline-flex',
				'inline flex',
				'grid',
				'inline-grid',
				'inline grid'
			].includes(parentDsiplay)
		) {
			return true;
		}
	}

	return false;
}

/**
 * Return the index order of how to position this element. return nodes in non-positioned, floating, positioned order
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_and_float
 * https://drafts.csswg.org/css2/visuren.html#layers
 * @param {VirtualNode} vNode
 * @return {Number}
 */
function getPositionOrder(vNode) {
	if (vNode.getComputedStylePropertyValue('position') === 'static') {
		// 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
		if (
			vNode.getComputedStylePropertyValue('display').indexOf('inline') !== -1
		) {
			return 2;
		}

		// 4. the non-positioned floats.
		if (vNode.getComputedStylePropertyValue('float') !== 'none') {
			return 1;
		}

		// 3. the in-flow, non-inline-level, non-positioned descendants.
		if (vNode.getComputedStylePropertyValue('position') === 'static') {
			return 0;
		}
	}

	// 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
	return 3;
}

/**
 * Visually sort nodes based on their stack order
 * References:
 * https://drafts.csswg.org/css2/visuren.html#layers
 * @param {VirtualNode}
 * @param {VirtualNode}
 */
function visuallySort(a, b) {
	/*eslint no-bitwise: 0 */

	// 1. The root element forms the root stacking context.
	if (a.actualNode.nodeName.toLowerCase() === 'html') {
		return 1;
	}
	if (b.actualNode.nodeName.toLowerCase() === 'html') {
		return -1;
	}

	for (let i = 0; i < a._stackingOrder.length; i++) {
		if (typeof b._stackingOrder[i] === 'undefined') {
			return -1;
		}

		// 7. the child stacking contexts with positive stack levels (least positive first).
		if (b._stackingOrder[i] > a._stackingOrder[i]) {
			return 1;
		}

		// 2. the child stacking contexts with negative stack levels (most negative first).
		if (b._stackingOrder[i] < a._stackingOrder[i]) {
			return -1;
		}
	}

	// nodes are the same stacking order
	const docPosition = a.actualNode.compareDocumentPosition(b.actualNode);
	const DOMOrder = docPosition & 4 ? 1 : -1;
	const isDescendant = docPosition & 8 || docPosition & 16;
	const aPosition = getPositionOrder(a);
	const bPosition = getPositionOrder(b);

	// a child of a positioned element should also be on top of the parent
	if (aPosition === bPosition || isDescendant) {
		return DOMOrder;
	}

	return bPosition - aPosition;
}

/**
 * Determine the stacking order of an element. The stacking order is an array of
 * zIndex values for each stacking context parent.
 * @param {VirtualNode}
 * @return {Number[]}
 */
function getStackingOrder(vNode) {
	const stackingOrder = vNode.parent
		? vNode.parent._stackingOrder.slice()
		: [0];

	if (vNode.getComputedStylePropertyValue('z-index') !== 'auto') {
		stackingOrder[stackingOrder.length - 1] = parseInt(
			vNode.getComputedStylePropertyValue('z-index')
		);
	}
	if (isStackingContext(vNode)) {
		stackingOrder.push(0);
	}

	return stackingOrder;
}

/**
 * Return the parent node that is a scroll region.
 * @param {VirtualNode}
 * @return {VirtualNode|null}
 */
function findScrollRegionParent(vNode) {
	let scrollRegionParent = null;
	let vNodeParent = vNode.parent;
	let checkedNodes = [vNode];

	while (vNodeParent) {
		if (vNodeParent._scrollRegionParent) {
			scrollRegionParent = vNodeParent._scrollRegionParent;
			break;
		}

		if (axe.utils.getScroll(vNodeParent.actualNode)) {
			scrollRegionParent = vNodeParent;
			break;
		}

		checkedNodes.push(vNodeParent);
		vNodeParent = vNodeParent.parent;
	}

	// cache result of parent scroll region so we don't have to look up the entire
	// tree again for a child node
	checkedNodes.forEach(
		vNode => (vNode._scrollRegionParent = scrollRegionParent)
	);
	return scrollRegionParent;
}

/**
 * Get the DOMRect x or y value. IE11 (and Phantom) does not support x/y
 * on DOMRect.
 * @param {DOMRect}
 * @param {String} pos 'x' or 'y'
 * @return {Number}
 */
function getDomPosition(rect, pos) {
	if (pos === 'x') {
		return 'x' in rect ? rect.x : rect.left;
	}

	return 'y' in rect ? rect.y : rect.top;
}

/**
 * Add a node to every cell of the grid it intersects with.
 * @param {Grid}
 * @param {VirtualNode}
 */
function addNodeToGrid(grid, vNode) {
	// save a reference to where this element is in the grid so we
	// can find it even if it's in a subgrid
	vNode._grid = grid;

	vNode.clientRects.forEach(rect => {
		const startRow = Math.floor(getDomPosition(rect, 'y') / gridSize);
		const startCol = Math.floor(getDomPosition(rect, 'x') / gridSize);

		const endRow = Math.floor(
			(getDomPosition(rect, 'y') + rect.height) / gridSize
		);
		const endCol = Math.floor(
			(getDomPosition(rect, 'x') + rect.width) / gridSize
		);

		for (let row = startRow; row <= endRow; row++) {
			grid.cells[row] = grid.cells[row] || [];

			for (let col = startCol; col <= endCol; col++) {
				grid.cells[row][col] = grid.cells[row][col] || [];

				if (!grid.cells[row][col].includes(vNode)) {
					grid.cells[row][col].push(vNode);
				}
			}
		}
	});
}

/**
 * Setup the 2d grid and add every element to it.
 */
function createGrid() {
	const rootGrid = {
		container: null,
		cells: []
	};

	axe.utils
		.querySelectorAll(axe._tree[0], '*')
		.filter(vNode => vNode.actualNode.parentElement !== document.head)
		.forEach(vNode => {
			if (vNode.actualNode.nodeType !== window.Node.ELEMENT_NODE) {
				return;
			}

			vNode._stackingOrder = getStackingOrder(vNode);

			// filter out any elements with 0 width or height
			// (we don't do this before so we can calculate stacking context
			// of parents with 0 width/height)
			const rect = vNode.boundingClientRect;
			if (rect.width === 0 || rect.height === 0) {
				return;
			}

			const scrollRegionParent = findScrollRegionParent(vNode);
			const grid = scrollRegionParent ? scrollRegionParent._subGrid : rootGrid;

			if (axe.utils.getScroll(vNode.actualNode)) {
				const subGrid = {
					container: vNode,
					cells: []
				};
				vNode._subGrid = subGrid;
			}

			addNodeToGrid(grid, vNode);
		});
}

/**
 * Return all elements that are at the center point of the passed in virtual node.
 * @method getElementStack
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @param {Boolean} [recursed] If the function has been called recursively
 * @return {VirtualNode[]}
 */
dom.getElementStack = function(vNode, recursed = false) {
	if (!axe._cache.get('gridCreated')) {
		createGrid();
		axe._cache.set('gridCreated', true);
	}

	const grid = vNode._grid;

	if (!grid) {
		return [];
	}

	const boundingRect = vNode.boundingClientRect;

	// use center point of rect
	let x = getDomPosition(boundingRect, 'x') + boundingRect.width / 2;
	let y = getDomPosition(boundingRect, 'y') + boundingRect.height / 2;

	// NOTE: there is a very rare edge case in Chrome vs Firefox that can
	// return different results of `document.elementsFromPoint`. If the center
	// point of the element is <1px outside of another elements bounding rect,
	// Chrome appears to round the number up and return the element while Firefox
	// keeps the number as is and won't return the element. In this case, we
	// went with pixel perfect collision rather than rounding
	const row = Math.floor(y / gridSize);
	const col = Math.floor(x / gridSize);
	let stack = grid.cells[row][col].filter(gridCellNode => {
		return gridCellNode.clientRects.find(rect => {
			let pointX = x;
			let pointY = y;

			let rectWidth = rect.width;
			let rectHeight = rect.height;
			let rectX = getDomPosition(rect, 'x');
			let rectY = getDomPosition(rect, 'y');

			// perform an AABB (axis-aligned bounding box) collision check for the
			// point inside the rect
			return (
				pointX < rectX + rectWidth &&
				pointX > rectX &&
				pointY < rectY + rectHeight &&
				pointY > rectY
			);
		});
	});

	if (grid.container) {
		stack = dom.getElementStack(grid.container, true).concat(stack);
	}

	if (!recursed) {
		stack.sort(visuallySort);
	}

	return stack;
};
