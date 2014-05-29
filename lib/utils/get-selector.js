/**
 * Gets the index of element siblings that have the same nodeName
 * Intended for use with the CSS psuedo-class `:nth-of-type()` and xpath node index
 * @param  {HTMLElement} element The element to test
 * @return {Number}         The number of preceeding siblings with the same nodeName
 */
function nthOfType(element) {
	'use strict';

	var index = 1,
		type = element.nodeName;

	/*jshint boss:true */
	while (element = element.previousElementSibling) {
		if (element.nodeName === type) {
			index++;
		}
	}

	return index;
}

function siblingsHaveSameSelector(node, selector) {
	'use strict';

	var index, sibling,
		siblings = node.parentNode.children,
		length = siblings.length;

	for (index = 0; index < length; index++) {
		sibling = siblings[index];
		if (sibling !== node && utils.matchesSelector(sibling, selector)) {
			return true;
		}
	}
	return false;
}


/**
 * Gets a unique CSS selector
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
utils.getSelector = function getSelector(node) {
	//jshint maxstatements: 20
	'use strict';

	var parts = [], part;

	while (node.parentNode) {
		part = '';

		if (node.id && document.querySelectorAll('#' + utils.escapeSelector(node.id)).length === 1) {
			parts.unshift('#' + utils.escapeSelector(node.id));
			break;
		}

		if (node.className && typeof node.className === 'string') {
			part = '.' + node.className.trim().split(/\s+/).join('.');
			if (siblingsHaveSameSelector(node, part)) {
				part = '';
			}
		}

		if (!part) {
			part = node.nodeName.toLowerCase();
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