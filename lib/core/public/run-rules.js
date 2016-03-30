/*global Context, getReporter */
/*exported runRules */

/**
 * Starts analysis on the current document and its subframes
 * @private
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} callback The function to invoke when analysis is complete; receives an array of `RuleResult`s
 */
function runRules(context, options, resolve, reject) {
	'use strict';
	context = new Context(context);

	var q = axe.utils.queue();
	var audit = axe._audit;

	if (context.frames.length) {
		q.defer(function (res, rej) {
			axe.utils.collectResultsFromFrames(context, options, 'rules', null, res, rej);
		});
	}
	q.defer(function (res, rej) {
		audit.run(context, options, res, rej);
	});
	q.then(function (data) {
		try {
			// Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
			var results = axe.utils.mergeResults(data.map(function (d) {
				return {
					results: d
				};
			}));

			// after should only run once, so ensure we are in the top level window
			if (context.initiator) {
				results = audit.after(results, options);
				results = results.map(axe.utils.finalizeRuleResult);
			}
			resolve(results);
		} catch (e) {
			reject(e);
		}
	}).catch(reject);
}

axe._runRules = runRules;

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
	var reporter = getReporter(options.reporter || audit.reporter);
	runRules(context, options, function (results) {
		reporter(results, callback);
	}, function () {});
};

