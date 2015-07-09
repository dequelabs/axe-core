

/**
 * Determine whether an element is visible
 *
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} The element's visibilty status
 */
utils.isHidden = function isHidden(el, recursed) {
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

	return utils.isHidden(el.parentNode, true);

};
