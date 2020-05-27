import focusDisabled from './focus-disabled';

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
		case 'SUMMARY':
		case 'BUTTON':
			return true;
		case 'DETAILS':
			return !el.querySelector('summary');
	}
	return false;
}

export default isNativelyFocusable;
