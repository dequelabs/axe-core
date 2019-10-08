/* global dom */

/**
 * Determines if focusing has been disabled on an element.
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} Whether focusing has been disabled on an element.
 */
function focusDisabled(el) {
	return (
		el.disabled ||
		(el.nodeName.toUpperCase() !== 'AREA' && dom.isHiddenWithCSS(el))
	);
}

/**
 * Determines if an element is focusable
 * @method isFocusable
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} The element's focusability status
 */

dom.isFocusable = function(el) {
	'use strict';
	if (focusDisabled(el)) {
		return false;
	} else if (dom.isNativelyFocusable(el)) {
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
	/* eslint indent: 0*/
	'use strict';

	if (!el || focusDisabled(el)) {
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

/**
 * Determines if an element is in the focus order, but would not be if its
 * tabindex were unspecified.
 * @method insertedIntoFocusOrder
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} True if the element is in the focus order but wouldn't be
 * if its tabindex were removed. Else, false.
 */
dom.insertedIntoFocusOrder = function(el) {
	return (
		el.tabIndex > -1 && dom.isFocusable(el) && !dom.isNativelyFocusable(el)
	);
};
