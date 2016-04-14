/*global helpers */


axe.reporter('v2', function (results, callback) {
	'use strict';

	var out = helpers.processAggregate(results);
	callback({
		violations: out.violations,
		passes: out.passes,
		notCompleted: out.notCompleted,
		timestamp: out.timestamp,
		url: out.url
	});

}, true);
