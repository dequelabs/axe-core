/*global helpers */


axe.reporter('v2', function (results, callback) {
	'use strict';

	function formatCheck(check) {
		return {
			id: check.id,
			impact: check.impact,
			message: check.message,
			data: check.data,
			relatedNodes: check.relatedNodes.map(helpers.formatNode)
		};
	}
	callback(helpers.splitResults(results, function (nodeResult, data) {
		nodeResult.any = data.any.map(formatCheck);
		nodeResult.all = data.all.map(formatCheck);
		nodeResult.none = data.none.map(formatCheck);
		return nodeResult;
	}));
}, true);
