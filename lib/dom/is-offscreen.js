/*global dom */

dom.isOffscreen = function (element) {
	'use strict';

	var leftBoundary,
		doc = element.ownerDocument,
		win = doc.defaultView,
		docElement = doc.documentElement,
		dir = win.getComputedStyle(doc.body || docElement)
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

		leftBoundary = Math.max(docElement.scrollWidth, dom.getViewportSize(win).width);
		if (coords.left > leftBoundary) {
			return true;
		}
	}

	return false;

};