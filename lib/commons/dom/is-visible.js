/* global dom */

/**
 * Determines if an element is hidden with the clip rect technique
 * @method isClipped
 * @memberof axe.commons.dom
 * @private
 * @param  {String}  clip Computed property value of clip
 * @return {Boolean}
 */
function isClipped(clip) {
	'use strict';

	var matches = clip.match(
		/rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/
	);
	if (matches && matches.length === 5) {
		return matches[3] - matches[1] <= 0 && matches[2] - matches[4] <= 0;
	}

	return false;
}

/**
 * Determine whether an element is visible
 * @method isVisible
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @param {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @param {Boolean} recursed
 * @return {Boolean} The element's visibilty status
 */
dom.isVisible = function(el, screenReader, recursed) {
	'use strict';
	const node = axe.utils.getNodeFromTree(el);
	const cacheName = '_isVisible' + (screenReader ? 'ScreenReader' : '');

	// 9 === Node.DOCUMENT
	if (el.nodeType === 9) {
		return true;
	}

	// 11 === Node.DOCUMENT_FRAGMENT_NODE
	if (el.nodeType === 11) {
		el = el.host; // grab the host Node
	}

	if (node && typeof node[cacheName] !== 'undefined') {
		return node[cacheName];
	}

	const style = window.getComputedStyle(el, null);
	if (style === null) {
		return false;
	}

	const nodeName = el.nodeName.toUpperCase();

	if (
		style.getPropertyValue('display') === 'none' ||
		['STYLE', 'SCRIPT', 'NOSCRIPT', 'TEMPLATE'].includes(nodeName) ||
		(!screenReader && isClipped(style.getPropertyValue('clip'))) ||
		(!recursed &&
			// visibility is only accurate on the first element
			(style.getPropertyValue('visibility') === 'hidden' ||
				// position does not matter if it was already calculated
				(!screenReader && dom.isOffscreen(el)))) ||
		(screenReader && el.getAttribute('aria-hidden') === 'true')
	) {
		return false;
	}

	const parent = el.assignedSlot ? el.assignedSlot : el.parentNode;
	let isVisible = false;
	if (parent) {
		isVisible = dom.isVisible(parent, screenReader, true);
	}

	if (node) {
		node[cacheName] = isVisible;
	}

	return isVisible;
};
