/*global helpers */

axe.reporter('v1', function (results, callback) {
	'use strict';

	var out = helpers.processAggregate(results);

	out.violations.forEach((result) => result.nodes.forEach((nodeResult) => {
		nodeResult.failureSummary = helpers.failureSummary(nodeResult);
	}));

	callback({
		violations: out.violations,
		passes: out.passes,
		timestamp: out.timestamp,
		url: out.url
	});

});
