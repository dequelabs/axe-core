/*global dom */

dom.isOffscreen = function (element) {
	'use strict';
	var noParentScrolled = function (element, offset) {
		element = element.parentNode;
		while (element.nodeName.toLowerCase() !== 'html') {
			if (element.scrollTop) {
				offset += element.scrollTop;
				if (offset >= 0) {
					return false;
				}
			}
			element = element.parentNode;
		}
		return true;
	};

	var leftBoundary,
		docElement = document.documentElement,
		dir = window.getComputedStyle(document.body || docElement)
			.getPropertyValue('direction'),
		coords = dom.getElementCoordinates(element);

	// bottom edge beyond
	if (coords.bottom < 0 && noParentScrolled(element, coords.bottom)) {
		return true;
	}

	if (coords.left === 0 && coords.right === 0) {
		//This is an edge case, an empty (zero-width) element that isn't positioned 'off screen'.
		return false;
	}

	if (dir === 'ltr') {
		if (coords.right <= 0) {
			return true;
		}
	} else {

		leftBoundary = Math.max(docElement.scrollWidth, dom.getViewportSize(window).width);
		if (coords.left >= leftBoundary) {
			return true;
		}
	}

	return false;

};
