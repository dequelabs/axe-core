/*global helpers */
axe.addReporter('no-passes', function (results, options, callback) {
	'use strict';
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	var out = helpers.processAggregate(results, options);

	callback({
		violations: out.violations,
		timestamp: out.timestamp,
		url: out.url
	});

});
