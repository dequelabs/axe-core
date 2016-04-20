/*global helpers */

axe.addReporter('v1', function (results, callback) {
	'use strict';

	var out = helpers.processAggregate(results);

	out.violations.forEach((result) => result.nodes.forEach((nodeResult) => {
		nodeResult.failureSummary = helpers.failureSummary(nodeResult);
	}));

	callback({
		violations: out.violations,
		passes: out.passes,
		incomplete: out.incomplete,
		inapplicable: out.inapplicable,
		timestamp: out.timestamp,
		url: out.url
	});

});
