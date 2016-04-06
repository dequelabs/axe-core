/*global helpers */


axe.addReporter('v2', function (results, callback) {
	'use strict';
	var formattedResults = helpers.splitResultsWithChecks(results);
	callback({
		violations: formattedResults.violations,
		passes: formattedResults.passes,
		timestamp: formattedResults.timestamp,
		url: formattedResults.url
	});
}, true);
