/*global helpers */

helpers.formatCheck = function (check) {
	'use strict';
	
	return {
		id: check.id,
		impact: check.impact,
		message: check.message,
		data: check.data,
		relatedNodes: check.relatedNodes.map(helpers.formatNode)
	};
};
