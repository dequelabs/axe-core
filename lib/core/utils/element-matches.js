/**
 * Polyfill for Element#matches
 * @param {HTMLElement} node The element to test
 * @param {String} selector The selector to test element against
 * @return {Boolean}
 */
axe.utils.matchesSelector = (function() {
	'use strict';

	let method;

	function getMethod(node) {
		let index,
			candidate,
			candidates = [
				'matches',
				'matchesSelector',
				'mozMatchesSelector',
				'webkitMatchesSelector',
				'msMatchesSelector'
			],
			length = candidates.length;

		for (index = 0; index < length; index++) {
			candidate = candidates[index];
			if (node[candidate]) {
				return candidate;
			}
		}
	}

	return function(node, selector) {
		if (!method || !node[method]) {
			method = getMethod(node);
		}

		return node[method](selector);
	};
})();
