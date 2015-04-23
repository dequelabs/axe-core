/*global helpers */


dqre.reporter('extended', function (results, callback) {
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
	callback(helpers.splitResults(results, function (nodeResult, data, result) {
		nodeResult.any = data.any.filter(function (check) {
			return result === dqre.constants.result.PASS ? check.result : !check.result;
		}).map(formatCheck);
		nodeResult.all = data.all.filter(function (check) {
			return result === dqre.constants.result.PASS ? check.result : !check.result;
		}).map(formatCheck);
		nodeResult.none = data.none.filter(function (check) {
			return result === dqre.constants.result.PASS ? !check.result : check.result;
		}).map(formatCheck);

		return nodeResult;
	}));
});
