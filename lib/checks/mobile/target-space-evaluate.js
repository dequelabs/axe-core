import { createGrid } from '../../commons/dom/get-rect-stack';
import { findNearbyElms } from '../../commons/dom';

const dimensionProps = [
	['x', 'left', 'right', 'width'],
	['y', 'top', 'bottom', 'height']
];

function getFarthestPoint(rectA, rectB) {
	const farthestPoint = {};
	dimensionProps.forEach(([axis, start, end, diameter]) => {
		if (rectA[start] <= rectB[start]) {
			farthestPoint[axis] = rectA[start];
		} else if (rectA[end] >= rectB[start]) {
			farthestPoint[axis] = rectA[end];
		} else {
			farthestPoint[axis] = rectA[start] + rectA[diameter] / 2; // center
		}
	});
	return farthestPoint;
}

function getClosestPoint({ x, y }, { top, right, bottom, left }) {
	const closestX = Math.abs(left - x) < Math.abs(right - x) ? left : right;
	const closestY = Math.abs(top - y) < Math.abs(bottom - y) ? top : bottom;
	return { x: closestX, y: closestY };
}

function pointDistance(pointA, pointB) {
	const xDistance = Math.abs(pointA.x - pointB.x);
	const yDistance = Math.abs(pointA.y - pointB.y);
	if (!xDistance || !yDistance) {
		return xDistance || yDistance; // If either is 0, return the other
	}
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function findDistance(vNodeA, vNodeB) {
	const rectA = vNodeA.boundingClientRect;
	const rectB = vNodeB.boundingClientRect;

	const pointA = getFarthestPoint(rectA, rectB);
	const pointB = getClosestPoint(pointA, rectB);
	return pointDistance(pointA, pointB);
}

export default function targetSpaceEvaluate(node, { minSpacing = 24 }, vNode) {
	createGrid();
	const rect = vNode.boundingClientRect;
	if (rect.width >= minSpacing && rect.height >= minSpacing) {
		return false;
	}

	const nearbyElms = findNearbyElms(vNode, minSpacing);
	const closeNeighbours = nearbyElms.filter(vNeighbour => {
		if (vNeighbour.props.nodeName !== 'span') {
			return false;
		}
		return findDistance(vNode, vNeighbour) < minSpacing;
	});

	this.relatedNodes(closeNeighbours.map(({ actualNode }) => actualNode));
	return closeNeighbours.length === 0;
}
