/*global helpers */


axe.addReporter('v2', function (results, options, callback) {
	'use strict';
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	var out = helpers.processAggregate(results, options);
	callback({
		violations: out.violations,
		passes: out.passes,
		incomplete: out.incomplete,
		inapplicable: out.inapplicable,
		timestamp: out.timestamp,
		url: out.url
	});

}, true);
