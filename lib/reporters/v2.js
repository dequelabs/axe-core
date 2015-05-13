/*global helpers */


dqre.reporter('v2', function (results, callback) {
	'use strict';

	function formatCheck(check) {
		return {
			id: check.id,
			impact: check.impact,
			failureMessage: check.failureMessage,
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
