/*global helpers */

axe.addReporter('na', function (results, options, callback) {
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
});

