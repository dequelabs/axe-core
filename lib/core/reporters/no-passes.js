/*global helpers */
axe.addReporter('no-passes', function (results, callback) {
	'use strict';

	var formattedResults = helpers.splitResultsWithChecks(results);
	callback({
		violations: formattedResults.violations,
		timestamp: formattedResults.timestamp,
		url: formattedResults.url
	});
});
