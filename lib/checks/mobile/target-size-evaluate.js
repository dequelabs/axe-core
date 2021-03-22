import { createGrid } from '../../commons/dom/get-rect-stack';
import { findNearbyElms, shadowElementsFromPoint } from '../../commons/dom';

export default function targetSize(node, { minSpacing = 24 }, vNode) {
	createGrid();
	const rect = vNode.boundingClientRect;
	if (elmHasMinimalSize(rect, minSpacing) === false) {
		return false;
	}

	const nearbyElms = findNearbyElms(vNode);
	const obscuringElms = nearbyElms.filter(vNeighbor => {
		if (vNeighbor.props.nodeName !== 'span') {
			return false;
		}
		const overlap = isOverlapping(vNode, vNeighbor);
		return overlap;
	});

	if (obscuringElms.length === 0) {
		return true;
	}

	const obscuringRects = obscuringElms.map(
		({ boundingClientRect }) => boundingClientRect
	);
	const unobscuredRects = splitRects(rect, obscuringRects);

	const hasMinimumSize = unobscuredRects.some(rect =>
		elmHasMinimalSize(rect, minSpacing)
	);

	if (!hasMinimumSize) {
		const smallestRect = unobscuredRects.reduce(
			(rectA, rectB) => rectA.width * rectA.height > rectB.width * rectB.height
		);
		this.data({ smallestRect });
		this.relatedNodes(obscuringElms.map(({ actualNode }) => actualNode));
		return false;
	}
	{
		return true;
	}
}

// Split a rect up, using
function splitRects(outerRect, overlapRects) {
	let uniqueRects = [outerRect];
	for (const overlapRect of overlapRects) {
		uniqueRects = uniqueRects.reduce(
			(uniqueRects, rect) => uniqueRects.concat(splitRect(rect, overlapRect)),
			[]
		);
	}
	return uniqueRects;
}

// Check if element A is rendered on a higher layer than element B
function isOverlapping(vNodeA, vNodeB) {
	const overlapRect = getRectOverlap(
		vNodeA.boundingClientRect,
		vNodeB.boundingClientRect
	);
	if (overlapRect === null || overlapRect.width < 1 || overlapRect.height < 1) {
		return false;
	}

	const stack = shadowElementsFromPoint(
		overlapRect.left + overlapRect.width / 2,
		overlapRect.top + overlapRect.height / 2
	);

	const indexA = stack.findIndex(elm => vNodeA.actualNode === elm);
	const indexB = stack.findIndex(elm => vNodeB.actualNode === elm);

	if (indexA === -1 || indexB === -1) {
		throw new Error('Failed to determine paint position of elements');
	}
	return indexB < indexA;
}

// Return the overlapping area of two rects, null if none
function getRectOverlap(rectA, rectB) {
	const baseRect = {
		top: Math.max(rectA.top, rectB.top),
		left: Math.max(rectA.left, rectB.left),
		bottom: Math.min(rectA.bottom, rectB.bottom),
		right: Math.min(rectA.right, rectB.right)
	};
	if (baseRect.top > baseRect.bottom || baseRect.left > baseRect.right) {
		return null; // no overlap
	}

	return computeRect(baseRect);
}

function splitRect(rectA, rectB) {
	const opposite = {
		top: 'bottom',
		left: 'right',
		bottom: 'top',
		right: 'left'
	};

	const overlapRect = getRectOverlap(rectA, rectB);
	if (!overlapRect) {
		return [];
	}

	return Object.keys(opposite).map(side =>
		computeRect({
			top: rectA.top,
			bottom: rectA.bottom,
			left: rectA.left,
			right: rectA.right,
			// Override one of the above, with its opposite
			[side]: overlapRect[opposite[side]]
		})
	);
}

function computeRect(baseRect) {
	return {
		...baseRect,
		x: baseRect.top,
		y: baseRect.left,
		height: baseRect.bottom - baseRect.top,
		width: baseRect.right - baseRect.left
	};
}

function elmHasMinimalSize(rect, minSize) {
	return rect.width >= minSize && rect.height >= minSize;
}
