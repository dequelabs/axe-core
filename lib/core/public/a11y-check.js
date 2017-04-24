/**
 * Starts analysis on the current document and its subframes
 * 
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} callback The function to invoke when analysis is complete; receives an array of `RuleResult`s
 */
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

	if (options.performanceTimer) {
		axe.utils.performanceTimer.start();
	}

	var reporter = axe.getReporter(options.reporter);
	axe._runRules(context, options, function (results) {
		var res = reporter(results, options, callback);
		if (res !== undefined) {
			if (options.performanceTimer) {
				axe.utils.performanceTimer.end();
			}
			callback(res);
		}
	}, axe.log);
};
