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

export default isFocusable;
