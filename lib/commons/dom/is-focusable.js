/*global dom */
/* jshint maxcomplexity: 20 */
/**
 * Determines if an element is focusable
 * @param {HTMLelement} element The HTMLelement
 * @return {Boolean} The element's focusability status
 */

dom.isFocusable = function (el) {
	'use strict';

	if (!el ||
		el.disabled ||
		(!dom.isVisible(el) && el.nodeName.toUpperCase() !== 'AREA')) {
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

	// check if the tabindex is specified and a parseable number
	var tabindex = el.getAttribute('tabindex');
	if (tabindex && !isNaN(parseInt(tabindex, 10))) {
		return true;
	}

	return false;
};
