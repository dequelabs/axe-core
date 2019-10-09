/* global dom */

// split the page cells to group elements by the position
const gridSize = 200; // arbitrary size, increase to reduce memory (less cells) use but increase time (more nodes per grid to check collision)

// https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element
const replacedElements = ['iframe', 'video', 'embed', 'img'];

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
	const transform =
		computedStyle.getPropertyValue('-webkit-transform') ||
		computedStyle.getPropertyValue('-ms-transform') ||
		computedStyle.getPropertyValue('transform') ||
		'none';
	if (transform !== 'none') {
		return true;
	}

	// elements with a mix-blend-mode value other than "normal"
	if (computedStyle.mixBlendMode && computedStyle.mixBlendMode !== 'normal') {
		return true;
	}

	// elements with a filter value other than "none"
	if (computedStyle.filter && computedStyle.filter !== 'none') {
		return true;
	}

	// elements with a perspective value other than "none"
	if (computedStyle.perspective && computedStyle.perspective !== 'none') {
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
		var parentStyle = node.parentNode.computedStyle;
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
 * Return the index order of how to position this element. return nodes in non-positioned, floating, positioned order
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_and_float
 * @param {CSSStyleDeclaration}
 * @return {Number}
 */
function getPositionOrder(style) {
	if (style.float !== 'none') {
		return 1;
	}

	if (style.position === 'static') {
		return 0;
	}

	// positioned element
	return 2;
}

/**
 * Visually sort nodes based on their stack order
 * @param {VirtualNode}
 * @param {VirtualNode}
 */
function visuallySort(a, b) {
	// html node is always sorted to the end of the stack
	// TODO: how do we test this?
	if (a.actualNode.nodeName.toLowerCase() === 'html') {
		return 1;
	}
	if (b.actualNode.nodeName.toLowerCase() === 'html') {
		return -1;
	}

	/*eslint no-bitwise: 0 */
	for (let i = 0; i < a._stackingOrder.length; i++) {
		if (typeof b._stackingOrder[i] === 'undefined') {
			return -1;
		}

		if (a._stackingOrder[i] === b._stackingOrder[i]) {
			continue;
		}

		if (b._stackingOrder[i] > a._stackingOrder[i]) {
			return 1;
		} else {
			return -1;
		}
	}

	// nodes are the same stacking order, compute special cases for when z-index
	// is not set
	const docPosition = a.actualNode.compareDocumentPosition(b.actualNode);
	const DOMOrder = docPosition & 4 ? 1 : -1;
	const isDescendant = docPosition & 8 || docPosition & 16;
	const aPosition = getPositionOrder(a.computedStyle);
	const bPosition = getPositionOrder(b.computedStyle);

	if (a.computedStyle.zIndex === 'auto' && b.computedStyle.zIndex === 'auto') {
		// a child of a positioned element should also be on top of the parent
		if (aPosition === bPosition || isDescendant) {
			return DOMOrder;
		}

		return bPosition - aPosition;
	}

	return DOMOrder;
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
}

/**
 * Return all elements that are at the center point of the passed in virtual node.
 * @method getElementStack
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @param {Boolean} recursed If the function has been called recursively
 * @return {VirtualNode[]}
 */
dom.getElementStack = function(vNode, recursed) {
	if (!axe._cache.get('gridCreated')) {
		createGrid();
		axe._cache.set('gridCreated', true);
	}

	const grid = vNode._grid;
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
	let stack = grid.cells[row][col].filter(vNode => {
		const rects = vNode.clientRects;
		const style = vNode.computedStyle;
		const nodeName = vNode.actualNode.nodeName.toLowerCase();
		return rects.find(rect => {
			let pointX = x;
			let pointY = y;

			let rectWidth = rect.width;
			let rectHeight = rect.height;
			let rectX = getDomPosition(rect, 'x');
			let rectY = getDomPosition(rect, 'y');

			const transform =
				style.getPropertyValue('-webkit-transform') ||
				style.getPropertyValue('-ms-transform') ||
				style.getPropertyValue('transform') ||
				'none';

			// if rect is rotated, rotate point around center of rect and then
			// perform collision detection as though the rect was not rotated
			if (
				transform.indexOf('matrix') === 0 &&
				// only non-replaced inline elements can be rotated
				// see https://developer.mozilla.org/en-US/docs/Web/CSS/transform
				(replacedElements.includes(nodeName) ||
					(style.display !== 'inline' && style.display !== 'contents'))
			) {
				// rect will no longer be the true width/height of element so we need
				// to look at offsetWidth/Height
				// @see https://stackoverflow.com/questions/40809153/get-element-dimensions-regardless-of-rotation
				rectWidth = vNode.actualNode.offsetWidth;
				rectHeight = vNode.actualNode.offsetHeight;

				// calculate non-rotated rect x/y based on the center point of the
				// rotated rect
				const centerX = rectX + rect.width / 2;
				const centerY = rectY + rect.height / 2;
				rectX = centerX - rectWidth / 2;
				rectY = centerY - rectHeight / 2;

				// calculate the angle of rotation from the rotation matrix
				// @see https://css-tricks.com/get-value-of-css-rotation-through-javascript/
				let values = transform.split('(')[1];
				values = values.split(')')[0];
				values = values.split(',');
				const a = values[0];
				const b = values[1];
				const angle = -Math.atan2(b, a); // rotate in the reverse direction

				// rotate point around center of rect and then perform collision
				// detection as though the rect was not rotated
				// @see https://www.gamefromscratch.com/post/2012/11/24/GameDev-math-recipes-Rotating-one-point-around-another-point.aspx
				if (angle !== 0) {
					pointX =
						Math.cos(angle) * (x - centerX) -
						Math.sin(angle) * (y - centerY) +
						centerX;
					pointY =
						Math.sin(angle) * (x - centerX) +
						Math.cos(angle) * (y - centerY) +
						centerY;
				}
			}

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
