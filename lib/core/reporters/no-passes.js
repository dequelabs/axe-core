/*global helpers */
axe.addReporter('no-passes', function (results, callback) {
	'use strict';

	var out = helpers.processAggregate(results);

	callback({
		violations: out.violations,
		timestamp: out.timestamp,
		url: out.url
	});

});
