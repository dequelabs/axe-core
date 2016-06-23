/*global Context */
/*exported runRules */

axe.a11yCheck = function (context, options, callback) {
	'use strict';
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	if (!options || typeof options !== 'object') {
		options = {};
	}

	var audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}
	options.reporter = options.reporter || audit.reporter || 'v2';

	var reporter = axe.getReporter(options.reporter);
	axe._runRules(context, options, function (results) {
		var res = reporter(results, callback);
		if (res !== undefined) {
			callback(res);
		}
	}, axe.log);
};

