/**
 * Polyfill for Element#matches
 * @param {HTMLElement} node The element to test
 * @param {String} selector The selector to test element against
 * @return {Boolean}
 */
axe.utils.matchesSelector = (function () {
	'use strict';

	var method;

	function getMethod(win) {

		var index, candidate,
			elProto = win.Element.prototype,
			candidates = ['matches', 'matchesSelector', 'mozMatchesSelector', 'webkitMatchesSelector', 'msMatchesSelector'],
			length = candidates.length;

		for (index = 0; index < length; index++) {
			candidate = candidates[index];
			if (elProto[candidate]) {
				return candidate;
			}
		}
	}


	return function (node, selector) {

		if (!method || !node[method]) {
			method = getMethod(node.ownerDocument.defaultView);
		}

		return node[method](selector);
	};
}());
