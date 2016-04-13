/*global helpers */


axe.reporter('na', function (results, callback) {
	'use strict';

	var out = helpers.processAggregate(results);

	callback({
		violations: out.violations,
		passes: out.passes,
		notApplicable: out.inapplicable,
		timestamp: out.timestamp,
		url: out.url
	});
});

