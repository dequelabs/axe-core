utils.contains = function (node, otherNode) {
	'use strict';

	if (typeof node.contains === 'function') {
		return node.contains(otherNode);
	}

	return node.compareDocumentPosition(otherNode) & 16;

};