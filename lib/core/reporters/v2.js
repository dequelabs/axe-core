/*global helpers */


axe.addReporter('v2', function (results, callback) {
	'use strict';

	var out = helpers.processAggregate(results);
	callback({
		violations: out.violations,
		passes: out.passes,
		incomplete: out.incomplete,
		inapplicable: out.inapplicable,
		timestamp: out.timestamp,
		url: out.url
	});

}, true);
