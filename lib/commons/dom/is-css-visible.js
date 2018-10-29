/* global dom */

/**
 * Determine if an element is hidden with display or visibility styles
 * @method isCssHidden
 * @memberof axe.commons.dom
 * @private
 * @param {CSSStyleDeclaration} style style applied to the element
 * @return {Boolean}
 */
function isCssHidden(style) {
	if (
		style.getPropertyValue('display') === 'none' ||
		style.getPropertyValue('visibility') === 'hidden'
	) {
		return true;
	}
	return false;
}

/**
 * Determine whether an element is css visible
 * @method isCssVisible
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTML Element
 * @return {Boolean} the element's visibility status
 */
dom.isCssVisible = function isCssVisible(el) {
	// 9 === Node.DOCUMENT
	if (el.nodeType === 9) {
		return true;
	}

	// 11 === Node.DOCUMENT_FRAGMENT_NODE
	if (el.nodeType === 11) {
		el = el.host; // swap to host node
	}

	const nodeName = el.nodeName.toUpperCase();
	if (['STYLE', 'SCRIPT'].includes(nodeName)) {
		return false;
	}

	const style = window.getComputedStyle(el, null);
	if (!style) {
		return false;
	}
	if (isCssHidden(style)) {
		return false;
	}

	const parent = el.assignedSlot ? el.assignedSlot : el.parentNode;
	if (!parent) {
		return false;
	}

	if (parent) {
		return dom.isCssVisible(parent);
	}

	return true;
};
