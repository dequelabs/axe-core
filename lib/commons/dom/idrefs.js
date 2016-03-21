/*global dom, axe */

/**
 * Get elements referenced via a space-separated token attribute; it will insert `null` for any Element that is not found
 * @param  {HTMLElement} node
 * @param  {String} attr The name of attribute
 * @return {Array}      Array of elements (or `null` if not found)
 */
dom.idrefs = function (node, attr) {
	'use strict';

	var index, length,
		doc = document,
		result = [],
		idrefs = node.getAttribute(attr);

	if (idrefs) {
		idrefs = axe.utils.tokenList(idrefs);
		for (index = 0, length = idrefs.length; index < length; index++) {
			result.push(doc.getElementById(idrefs[index]));
		}
	}

	return result;
};