/**
 * Gets the index of element siblings that have the same nodeName
 * Intended for use with the CSS psuedo-class `:nth-of-type()` and xpath node index
 * @param  {HTMLElement} element The element to test
 * @return {Number}         The number of preceeding siblings with the same nodeName
 * @private
 */
function nthOfType(element) {
	'use strict';

	var index = 1,
		type = element.nodeName.toUpperCase();

	/*jshint boss:true */
	element = element.previousElementSibling;
	while (element) {
		if (element.nodeName.toUpperCase() === type) {
			index++;
		}
		element = element.previousElementSibling;
	}

	return index;
}

/**
 * Checks if an element has siblings with the same selector
 * @param  {HTMLElement} node     The element to test
 * @param  {String} selector The CSS selector to test
 * @return {Boolean}          Whether any of element's siblings matches selector
 * @private
 */
function siblingsHaveSameSelector(node, selector) {
	'use strict';

	var index, sibling,
		siblings = node.parentNode.children;

	if (!siblings) {
		return false;
	}

	var length = siblings.length;

	for (index = 0; index < length; index++) {
		sibling = siblings[index];
		if (sibling !== node && axe.utils.matchesSelector(sibling, selector)) {
			return true;
		}
	}
	return false;
}


/**
 * Gets a unique CSS selector
 * @param  {HTMLElement} node The element to get the selector for
 * @return {String}      Unique CSS selector for the node
 */
axe.utils.getSelector = function getSelector(node) {
	//jshint maxstatements: 21
	'use strict';

	function escape(p) {
		return axe.utils.escapeSelector(p);
	}

	var parts = [], part;

	while (node.parentNode) {
		part = '';

		if (node.id && document.querySelectorAll('#' + axe.utils.escapeSelector(node.id)).length === 1) {
			parts.unshift('#' + axe.utils.escapeSelector(node.id));
			break;
		}

		if (node.className && typeof node.className === 'string') {
			part = '.' + node.className.trim().split(/\s+/).map(escape).join('.');
			if (part === '.' || siblingsHaveSameSelector(node, part)) {
				part = '';
			}
		}

		if (!part) {
			part = axe.utils.escapeSelector(node.nodeName).toLowerCase();
			if (part === 'html' || part === 'body') {
				parts.unshift(part);
				break;
			}
			if (siblingsHaveSameSelector(node, part)) {
				part += ':nth-of-type(' + nthOfType(node) + ')';
			}

		}

		parts.unshift(part);

		node = node.parentNode;
	}

	return parts.join(' > ');

};
