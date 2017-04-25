/*global Context */
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
	try {
		context = new Context(context);
	} catch (e) {
		return reject(e);
	}

	var q = axe.utils.queue();
	var audit = axe._audit;

	if (options.performanceTimer) {
		axe.utils.performanceTimer.auditStart();
	}

	if (context.frames.length && options.iframes !== false) {
		q.defer(function (res, rej) {
			axe.utils.collectResultsFromFrames(context, options, 'rules', null, res, rej);
		});
	}
	q.defer(function (res, rej) {
		audit.run(context, options, res, rej);
	});
	q.then(function (data) {
		try {
			if (options.performanceTimer) {
				axe.utils.performanceTimer.auditEnd();
			}

			// Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
			var results = axe.utils.mergeResults(data.map(function (d) {
				return {
					results: d
				};
			}));

			// after should only run once, so ensure we are in the top level window
			if (context.initiator) {
				results = audit.after(results, options);

				results.forEach(axe.utils.publishMetaData);
				results = results.map(axe.utils.finalizeRuleResult);
			}
			try {
				resolve(results);
			} catch(e) {
				axe.log(e);
			}
		} catch (e) {
			reject(e);
		}
	}).catch(reject);
}

axe._runRules = runRules;
