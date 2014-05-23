utils.contains = function (node, otherNode) {
	//jshint bitwise: false
	'use strict';

	if (typeof node.contains === 'function') {
		return node.contains(otherNode);
	}

	return !!(node.compareDocumentPosition(otherNode) & 16);

};