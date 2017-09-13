

/**
 * Determine whether an element is visible
 * @method isHidden
 * @memberof axe.utils
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @param {Boolean} recursed
 * @return {Boolean} The element's visibilty status
 */
axe.utils.isHidden = function isHidden(el, recursed) {
	'use strict';

	// 9 === Node.DOCUMENT
	if (el.nodeType === 9) {
		return false;
	}

	var style = window.getComputedStyle(el, null);

	if (!style || (!el.parentNode || (style.getPropertyValue('display') === 'none' ||

			(!recursed &&
				// visibility is only accurate on the first element
				(style.getPropertyValue('visibility') === 'hidden')) ||

			(el.getAttribute('aria-hidden') === 'true')))) {

		return true;
	}

	return axe.utils.isHidden(el.parentNode, true);

};
