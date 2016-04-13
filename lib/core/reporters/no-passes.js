/*global helpers */
axe.reporter('no-passes', function (results, callback) {
	'use strict';

	var out = helpers.processAggregate(results);

	callback({
		violations: out.violations,
		timestamp: out.timestamp,
		url: out.url
	});

});
