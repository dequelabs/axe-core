/* global dom */
const clipRegex = /rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/;
const clipPathRegex = /(\w+)\((\d+)/;

/**
 * Determines if an element is hidden with a clip or clip-path technique
 * @method isClipped
 * @memberof axe.commons.dom
 * @private
 * @param  {CSSStyleDeclaration} style Computed style
 * @return {Boolean}
 */
function isClipped(style) {
	'use strict';

	const matchesClip = style.getPropertyValue('clip').match(clipRegex);
	const matchesClipPath = style
		.getPropertyValue('clip-path')
		.match(clipPathRegex);
	if (matchesClip && matchesClip.length === 5) {
		return (
			matchesClip[3] - matchesClip[1] <= 0 &&
			matchesClip[2] - matchesClip[4] <= 0
		);
	}
	if (matchesClipPath) {
		const type = matchesClipPath[1];
		const value = parseInt(matchesClipPath[2], 10);

		switch (type) {
			case 'inset':
				return value >= 50;
			case 'circle':
				return value === 0;
			default:
		}
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
		(!screenReader && isClipped(style)) ||
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
