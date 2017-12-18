/* global dom */
/* jshint maxcomplexity: 20 */

/**
 * Determines if an element is hidden in such a way that makes it unfocusable
 * @private
 * @param {Element} el
 * @return {Boolean} Whether the element is unfocusable due to being hidden
 */
function unfocusableBecauseHidden (el) {
	var style = window.getComputedStyle(el);
	return (
		style === null || style.getPropertyValue('visibility') === 'hidden' ||
		style.getPropertyValue('display') === 'none');
}

/**
 * Determines if an element is focusable
 * @method isFocusable
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} The element's focusability status
 */

dom.isFocusable = function (el) {
	'use strict';

	if (dom.isNativelyFocusable(el)) {
		return true;
	}
	// check if the tabindex is specified and a parseable number
	var tabindex = el.getAttribute('tabindex');
	if (tabindex && !isNaN(parseInt(tabindex, 10))) {
		return true;
	}

	return false;
};

/**
 * Determines if an element is focusable without considering its tabindex
 * @method isNativelyFocusable
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} True if the element is in the focus order but wouldn't be
 * if its tabindex were removed. Else, false.
 */
dom.isNativelyFocusable = function(el) {
	'use strict';

	if (!el ||
		el.disabled ||
		(unfocusableBecauseHidden(el) && el.nodeName.toUpperCase() !== 'AREA')) {
		return false;
	}

	switch (el.nodeName.toUpperCase()) {
		case 'A':
		case 'AREA':
			if (el.href) {
				return true;
			}
			break;
		case 'INPUT':
			return el.type !== 'hidden';
		case 'TEXTAREA':
		case 'SELECT':
		case 'DETAILS':
		case 'BUTTON':
			return true;
	}
	return false;
};
