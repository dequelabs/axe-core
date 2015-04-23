/*global helpers */
helpers.formatNode = function (node) {
	'use strict';

	return {
		target: node ? node.selector : null,
		html: node ? node.source : null
	};
};
