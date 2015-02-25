/*global Context */
/*exported runRules */

/**
 * Starts analysis on the current document and its subframes
 * @private
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} callback The function to invoke when analysis is complete; receives an array of `RuleResult`s
 */
function runRules(context, options, callback) {
	'use strict';
	context = new Context(context);
	options = options || {};

	if (!dqre.audit) {
		throw new Error('No audit configured');
	}

	var q = utils.queue();

	if (context.frames.length) {
		q.defer(function (done) {
			utils.collectResultsFromFrames(context, options, 'rules', null, done);
		});
	}
	q.defer(function (cb) {
		dqre.audit.run(context, options, cb);
	});
	q.then(function (data) {
		// Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
		var results = utils.mergeResults(data.map(function (d) {
			return {
				results: d
			};
		}));

		// after should only run once, so ensure we are in the top level window
		if (context.initiator) {
			results = dqre.audit.after(results, options);
			results.forEach(function (result) {
				utils.calculateRuleResult(result);
				utils.publishMetaData(result);
			});
		}

		callback(results);
	});

}
dqre.raw = runRules;
