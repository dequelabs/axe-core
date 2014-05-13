/*global dom */
/**
 * Get the coordinates of the element passed into the function relative to the document
 *
 * #### Returns
 *
 * Returns a `Object` with the following properties, which
 * each hold a value representing the pixels for each of the
 * respective coordinates:
 *
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 * - `width`
 * - `height`
 *
 * @param {HTMLElement} el The HTMLElement
 */
dom.getElementCoordinates = function (element, frame) {
	'use strict';
	frame = frame || false;

	var frameCoords,
		doc = element.ownerDocument,
		scrollOffset = dom.getScrollOffset(doc),
		xOffset = scrollOffset.left,
		yOffset = scrollOffset.top,
		coords = element.getBoundingClientRect();

	if (frame && doc.defaultView.frameElement) {
		try {
			frameCoords = dom.getElementCoordinates(doc.defaultView.frameElement, true);
		} catch (e) {
			frameCoords = {};
		}
		xOffset += frameCoords.left || 0;
		yOffset += frameCoords.top || 0;
	}

	return {
		top: coords.top + yOffset,
		right: coords.right + xOffset,
		bottom: coords.bottom + yOffset,
		left: coords.left + xOffset,

		width: coords.right - coords.left,
		height: coords.bottom - coords.top
	};
};