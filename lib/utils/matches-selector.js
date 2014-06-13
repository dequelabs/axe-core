
/**
 * Polyfill for Element#matches
 * @param {HTMLElement} node The element to test
 * @param {String} selector The selector to test element against
 * @return {Boolean}
 */
utils.matchesSelector = (function () {
	'use strict';

	var method, index,
		elProto = Element.prototype,
		candidates = ['matches', 'matchesSelector', 'mozMatchesSelector', 'webkitMatchesSelector', 'msMatchesSelector'],
		length = candidates.length;

	for (index = 0; index < length; index++) {
		method = candidates[index];
		/* istanbul ignore else  */
		if (elProto[method]) {
			break;
		}
	}
	return function (element, selector) {
		return element[method](selector);
	};
}());