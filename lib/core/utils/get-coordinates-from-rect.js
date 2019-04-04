/**
 * Get coordinates for an element's client rects or bounding client rect
 *
 * @method getCoordinatesFromRect
 * @memberof axe.utils
 *
 * @param {DOMRect} rect
 * @return {Object | undefined}
 */
axe.utils.getCoordinatesFromRect = function getCoordinatesFromRect(rect) {
	if (rect.left < 0 || rect.left > window.innerWidth) {
		return undefined;
	}

	if (rect.top < 0 || rect.top > window.innerHeight) {
		return undefined;
	}

	const x = Math.min(
		Math.ceil(rect.left + rect.width / 2),
		window.innerWidth - 1
	);
	const y = Math.min(
		Math.ceil(rect.top + rect.height / 2),
		window.innerHeight - 1
	);

	return { x, y };
};
