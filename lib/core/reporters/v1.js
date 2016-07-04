/*global helpers */

axe.addReporter('v1', function (results, options, callback) {
	'use strict';

	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	var out = helpers.processAggregate(results, options);

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
