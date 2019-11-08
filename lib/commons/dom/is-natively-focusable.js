import isHiddenWithCSS from './is-hidden-with-css.js';

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
 * Determines if an element is focusable without considering its tabindex
 * @method isNativelyFocusable
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} True if the element is in the focus order but wouldn't be
 * if its tabindex were removed. Else, false.
 */
function isNativelyFocusable(el) {
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
}

export default isNativelyFocusable;
