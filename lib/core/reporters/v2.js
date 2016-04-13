/*global helpers */


axe.reporter('v2', function (results, callback) {
	'use strict';

	var out = helpers.processAggregate(results);

	callback({
		violations: out.violations,
		passes: out.passes,
		timestamp: out.timestamp,
		url: out.url
	});

	// var formattedResults = helpers.splitResultsWithChecks(results);
	// callback({
	// 	violations: formattedResults.violations,
	// 	passes: formattedResults.passes,
	// 	timestamp: formattedResults.timestamp,
	// 	url: formattedResults.url
	// });
}, true);
