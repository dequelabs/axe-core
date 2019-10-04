// split the page into 100px x 100px cells
const gridSize = 100; // TODO: change to const once removed from getBackgroundColor

/**
 * Determine if node produces a stacking context.
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
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

	const computedStyle = vNode.computedStyle;

	// position: fixed or sticky
	if (
		computedStyle.position === 'fixed' ||
		computedStyle.position === 'sticky'
	) {
		return true;
	}

	// positioned (absolutely or relatively) with a z-index value other than "auto",
	if (computedStyle.zIndex !== 'auto' && computedStyle.position !== 'static') {
		return true;
	}

	// elements with an opacity value less than 1.
	if (computedStyle.opacity !== '1') {
		return true;
	}

	// elements with a transform value other than "none"
	if (computedStyle.transform !== 'none') {
		return true;
	}

	// elements with a mix-blend-mode value other than "normal"
	if (computedStyle.mixBlendMode !== 'normal') {
		return true;
	}

	// elements with a filter value other than "none"
	if (computedStyle.filter !== 'none') {
		return true;
	}

	// elements with a perspective value other than "none"
	if (computedStyle.perspective !== 'none') {
		return true;
	}

	// elements with isolation set to "isolate"
	if (computedStyle.isolation === 'isolate') {
		return true;
	}

	// transform or opacity in will-change even if you don't specify values for these attributes directly
	if (
		computedStyle.willChange === 'transform' ||
		computedStyle.willChange === 'opacity'
	) {
		return true;
	}

	// elements with -webkit-overflow-scrolling set to "touch"
	if (computedStyle.webkitOverflowScrolling === 'touch') {
		return true;
	}

	// a flex item with a z-index value other than "auto", that is the parent element display: flex|inline-flex,
	if (computedStyle.zIndex !== 'auto') {
		var parentStyle = getComputedStyle(node.parentNode);
		if (
			parentStyle.display === 'flex' ||
			parentStyle.display === 'inline-flex'
		) {
			return true;
		}
	}

	return false;
}

/**
 * Visually sort nodes based on their stack order
 * @param {VirtualNode}
 * @param {VirtualNode}
 */
function visuallySort(a, b) {
	/*eslint no-bitwise: 0 */
	for (let i = 0; i < a._stackingOrder.length; i++) {
		if (typeof b._stackingOrder[i] === 'undefined') {
			return -1;
		}

		if (a._stackingOrder[i] === b._stackingOrder[i]) {
			continue;
		}

		if (b.stackOrder[i] > a.stackOrder[i]) {
			return 1;
		} else {
			return -1;
		}
	}

	// same stack, return the later node
	// TODO: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index
	if (a.actualNode.compareDocumentPosition(b.actualNode) & 4) {
		return 1; // a before b
	} else {
		return -1; // b before a
	}
}

/**
 * Determine the stacking order of an element. The stacking order is an array of
 * zIndex values for each stacking context parent.
 * @param {VirtualNode}
 * @return {Number[]}
 */
function getStackingOrder(vNode) {
	const style = vNode.computedStyle;
	const stackingOrder = vNode.parent
		? vNode.parent._stackingOrder.slice()
		: [0];

	if (style.zIndex !== 'auto') {
		stackingOrder[stackingOrder.length - 1] = parseInt(style.zIndex);
	}
	if (isStackingContext(vNode)) {
		stackingOrder.push(0);
	}

	return stackingOrder;
}

/**
 * Determine if a node is a scroll region.
 * @param {VirtualNode}
 * @return {Boolean}
 */
function isScrollRegion(vNode) {
	const style = vNode.computedStyle;

	return (
		style.overflowX === 'auto' ||
		style.overflowX === 'scroll' ||
		style.overflowY === 'auto' ||
		style.overflowY === 'scroll'
	);
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

		if (isScrollRegion(vNodeParent)) {
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
 * Add a node to every cell of the grid it intersects with.
 * @param {Grid}
 * @param {VirtualNode}
 */
function addNodeToGrid(grid, vNode) {
	// save a reference to where this element is in the grid so we
	// can find it even if it's in a subgrid
	vNode._grid = grid;

	vNode.clientRects.forEach(rect => {
		const startRow = Math.floor(rect.y / gridSize);
		const endRow = Math.floor((rect.y + rect.height) / gridSize);
		const startCol = Math.floor(rect.x / gridSize);
		const endCol = Math.floor((rect.x + rect.width) / gridSize);

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
 *
 */
function createGrid() {
	const rootGrid = {
		container: axe._tree[0],
		cells: []
	};

	axe.utils
		.querySelectorAll(axe._tree[0], 'html, body, body *')
		.forEach(vNode => {
			if (vNode.actualNode.nodeType !== 1) {
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

			if (isScrollRegion(vNode)) {
				const subGrid = {
					container: vNode,
					cells: []
				};
				vNode._subGrid = subGrid;
			}

			addNodeToGrid(grid, vNode);
		});

	// sort the grid by stacking order
	// for (let row = 0; row < grid.cells.length; row++) {
	//   for (let col = 0; col < grid.cells[row].length; col++) {
	//     grid.cells[row][col].sort(visuallySort);
	//   }
	// }

	// return grid;
}

const position = (commons.position = {});

position.getElementStack = function(vNode, recurrsed) {
	if (!axe._cache.get('grid')) {
		createGrid();
		axe._cache.set('grid', true);
	}

	const grid = vNode._grid;
	const boundingRect = vNode.boundingClientRect;

	// use center point of rect
	const x = boundingRect.x + boundingRect.width / 2;
	const y = boundingRect.y + boundingRect.height / 2;

	const row = Math.floor(y / gridSize);
	const col = Math.floor(x / gridSize);

	let stack = grid.cells[row][col].filter(vNode => {
		const rects = vNode.clientRects;
		return rects.find(rect => {
			return (
				x < rect.x + rect.width &&
				x > rect.x &&
				y < rect.y + rect.height &&
				y > rect.y
			);
		});
	});

	if (
		grid.container &&
		grid.container.actualNode !== document.documentElement
	) {
		stack = position.getElementStack(grid.container, true).concat(stack);
	}

	if (!recurrsed) {
		stack.sort(visuallySort);
	}

	return stack;
};

// position.elementFromPoint = function(x, y) {
//   if(!axe._cache.get('grid')) {
//     axe._cache.set('grid', position.createGrid());
//   }
//   const grid = axe._cache.get('grid');
//   const row = Math.floor(y / gridSize);
//   const col = Math.floor(x / gridSize);

//   return grid.cells[row][col].find(vNode => {
//     const rects = vNode.clientRects;
//     return rects.find(rect => {
//       return (
//         x < rect.x + rect.width &&
//         x > rect.x &&
//         y < rect.y + rect.height &&
//         y > rect.y
//       );
//     });
//   });
// }

// position.elementsFromPoint = function(x, y) {
//   if(!axe._cache.get('grid')) {
//     axe._cache.set('grid', position.createGrid());
//   }
//   const grid = axe._cache.get('grid');
//   const row = Math.floor(y / gridSize);
//   const col = Math.floor(x / gridSize);

//   return grid.cells[row][col].filter(vNode => {
//     const rects = vNode.clientRects;
//     return rects.find(rect => {
//       return (
//         x < rect.x + rect.width &&
//         x > rect.x &&
//         y < rect.y + rect.height &&
//         y > rect.y
//       );
//     });
//   });
// }
