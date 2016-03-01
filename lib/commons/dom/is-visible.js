/*global dom */
/*jshint maxcomplexity: 11 */

/**
 * Determines if an element is hidden with the clip rect technique
 * @param  {String}  clip Computed property value of clip
 * @return {Boolean}
 */
function isClipped(clip) {
	'use strict';

	var matches = clip.match(/rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/);
	if (matches && matches.length === 5) {
		return matches[3] - matches[1] <= 0 && matches[2] - matches[4] <= 0;
	}

	return false;

}

/**
 * Determine whether an element is visible
 *
 * @param {HTMLElement} el The HTMLElement
 * @param {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @return {Boolean} The element's visibilty status
 */
dom.isVisible = function (el, screenReader, recursed) {
	'use strict';
	var style,
		nodeName = el.nodeName.toUpperCase(),
		parent = el.parentNode;

	// 9 === Node.DOCUMENT
	if (el.nodeType === 9) {
		return true;
	}

	style = window.getComputedStyle(el, null);
	if (style === null) {
		return false;
	}

	if (style.getPropertyValue('display') === 'none' ||

		nodeName.toUpperCase() === 'STYLE' || nodeName.toUpperCase() === 'SCRIPT' ||

		(!screenReader && (isClipped(style.getPropertyValue('clip')))) ||

		(!recursed &&
			// visibility is only accurate on the first element
			(style.getPropertyValue('visibility') === 'hidden' ||
			// position does not matter if it was already calculated
			!screenReader && dom.isOffscreen(el))) ||

		(screenReader && el.getAttribute('aria-hidden') === 'true')) {

		return false;
	}

	if (parent) {
		return dom.isVisible(parent, screenReader, true);
	}

	return false;

};
