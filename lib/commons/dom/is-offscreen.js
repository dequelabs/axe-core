/*global dom */

dom.isOffscreen = function (element) {
	'use strict';

	var leftBoundary,
		docElement = document.documentElement,
		dir = window.getComputedStyle(document.body || docElement)
			.getPropertyValue('direction'),
		coords = dom.getElementCoordinates(element);

	// bottom edge beyond
	if (coords.bottom < 0) {
		return true;
	}

	if (dir === 'ltr') {
		if (coords.right < 0) {
			return true;
		}
	} else {

		leftBoundary = Math.max(docElement.scrollWidth, dom.getViewportSize(window).width);
		if (coords.left > leftBoundary) {
			return true;
		}
	}

	return false;

};
