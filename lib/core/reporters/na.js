/*global helpers */
axe.addReporter('na', function (results, callback) {
	'use strict';
	var na = results.filter(function (rr) {
		return rr.violations.length === 0 && rr.passes.length === 0;
	}).map(helpers.formatRuleResult);

	var formattedResults = helpers.splitResultsWithChecks(results);
	callback({
		violations: formattedResults.violations,
		passes: formattedResults.passes,
		notApplicable: na,
		timestamp: formattedResults.timestamp,
		url: formattedResults.url
	});
});
