import isHiddenWithCSS from './is-hidden-with-css.js';
import isNativelyFocusable from './is-natively-focusable.js';

/**
 * Determines if focusing has been disabled on an element.
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} Whether focusing has been disabled on an element.
 */
function focusDisabled(el) {
	return (
		el.disabled || (el.nodeName.toUpperCase() !== 'AREA' && isHiddenWithCSS(el))
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

function isFocusable(el) {
	'use strict';
	if (focusDisabled(el)) {
		return false;
	} else if (isNativelyFocusable(el)) {
		return true;
	}
	// check if the tabindex is specified and a parseable number
	var tabindex = el.getAttribute('tabindex');
	if (tabindex && !isNaN(parseInt(tabindex, 10))) {
		return true;
	}

	return false;
}

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
	let tabIndex = parseInt(el.getAttribute('tabindex'), 10);

	// an element that has an invalid tabindex will return 0 or -1 based on
	// if it is natively focusable or not, which will always be false for this
	// check as NaN is not > 1
	// @see https://www.w3.org/TR/html51/editing.html#the-tabindex-attribute
	return tabIndex > -1 && dom.isFocusable(el) && !dom.isNativelyFocusable(el);
};
