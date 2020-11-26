import { createGrid } from '../../commons/dom/get-rect-stack';
import { findNearbyElms } from '../../commons/dom';

function isOverlap(rectA, rectB) {
	let overlapCount = 0;
	if (rectB.top > rectA.top && rectB.top < rectA.bottom) {
		overlapCount++;
	}
	if (rectB.bottom > rectA.top && rectB.bottom < rectA.bottom) {
		overlapCount++;
	}
	if (rectB.left > rectA.left && rectB.left < rectA.right) {
		overlapCount++;
	}
	if (rectB.right > rectA.left && rectB.right < rectA.right) {
		overlapCount++;
	}
	return overlapCount >= 2;
}

export default function targetSize(node, { minSpacing = 24 }, vNode) {
	createGrid();
	const rect = vNode.boundingClientRect;
	if (rect.width < minSpacing || rect.height < minSpacing) {
		return false;
	}

	// TODO: Consider which one is on top
	const nearbyElms = findNearbyElms(vNode);
	const containedElms = nearbyElms.filter(vNeighbour => {
		if (vNeighbour.props.nodeName !== 'span') {
			return false;
		}
		return isOverlap(rect, vNeighbour.boundingClientRect);
	});

	if (containedElms.length === 0) {
		return true;
	}

	return false;
}
