/*global helpers */
helpers.splitResultsWithChecks = function (results) {
	'use strict';
	return helpers.splitResults(results, helpers.formatChecks);
};
