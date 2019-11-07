import centerPointOfRect from './center-point-of-rect.js';
import shadowElementsFromPoint from '../dom/shadow-elements-from-point.js';

/**
 * Get relevant stacks of block and inline elements, excluding line breaks
 * @method getRectStack
 * @memberof axe.commons.color
 * @param {Element} elm
 * @return {Array}
 */
function getRectStack(elm) {
	const boundingCoords = centerPointOfRect(elm.getBoundingClientRect());

	if (!boundingCoords) {
		return null;
	}

	let boundingStack = shadowElementsFromPoint(
		boundingCoords.x,
		boundingCoords.y
	);

	let rects = Array.from(elm.getClientRects());
	// If the element does not have multiple rects, like for display:block, return a single stack
	if (!rects || rects.length <= 1) {
		return [boundingStack];
	}

	// Handle inline elements spanning multiple lines to be evaluated
	let filteredArr = rects
		.filter(rect => {
			// exclude manual line breaks in Chrome/Safari
			return rect.width && rect.width > 0;
		})
		.map(rect => {
			const coords = centerPointOfRect(rect);
			if (coords) {
				return shadowElementsFromPoint(coords.x, coords.y);
			}
		});

	if (filteredArr.some(stack => stack === undefined)) {
		// Can be happen when one or more of the rects sits outside the viewport
		return null;
	}

	// add bounding client rect stack for comparison later
	filteredArr.splice(0, 0, boundingStack);
	return filteredArr;
}

export default getRectStack;
