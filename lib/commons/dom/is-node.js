/*global dom */
dom.isNode = function (candidate) {
	'use strict';
	return candidate instanceof Node;
};
