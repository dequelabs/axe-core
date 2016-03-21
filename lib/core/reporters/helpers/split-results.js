/*global helpers */

helpers.splitResults = function (results, nodeDataMapper) {
	'use strict';

	var violations = [],
		passes = [];

	results.forEach(function (rr) {

		function mapNode(nodeData) {
			var result = nodeData.result || rr.result;
			var node = helpers.formatNode(nodeData.node);
			node.impact = nodeData.impact || null;

			return nodeDataMapper(node, nodeData, result);
		}

		var failResult,
			passResult = helpers.formatRuleResult(rr);

		failResult = axe.utils.clone(passResult);
		failResult.impact = rr.impact || null;

		failResult.nodes = rr.violations.map(mapNode);
		passResult.nodes = rr.passes.map(mapNode);

		if (failResult.nodes.length) {
			violations.push(failResult);
		}
		if (passResult.nodes.length) {
			passes.push(passResult);
		}
	});

	return {
		violations: violations,
		passes: passes,
		url: window.location.href,
		timestamp: new Date()
	};
};
