/*global dom, utils */

dom.idrefs = function (node, attr) {
	'use strict';

	var index, length,
		doc = node.ownerDocument,
		result = [],
		idrefs = node.getAttribute(attr);

	if (idrefs) {
		idrefs = kslib.utils.tokenList(idrefs);
		for (index = 0, length = idrefs.length; index < length; index++) {
			result.push(doc.getElementById(idrefs[index]));
		}
	}

	return result;
};