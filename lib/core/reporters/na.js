/*global helpers */

axe.reporter('na', function (results, callback) {
	'use strict';

	var out = helpers.processAggregate(results);
	callback({
		violations: out.violations,
		passes: out.passes,
		notApplied: out.notApplied,
		timestamp: out.timestamp,
		url: out.url
	});
});

