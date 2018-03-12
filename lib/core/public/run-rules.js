/*global Context */
/*exported runRules */

function complete (cb, ...args) {
	cb(...args);
	// Clean up after resolve / reject
	axe._tree = undefined;
	axe._selectorData = undefined;
}

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
		axe._tree = context.flatTree;
		axe._selectorData = axe.utils.getSelectorData(context.flatTree);
	} catch (e) {
		return complete(reject, e);
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
	let scrollState;
	q.defer(function (res, rej) {
		if (options.restoreScroll) {
			scrollState = axe.utils.getScrollState();
		}
		audit.run(context, options, res, rej);
	});
	q.then(function (data) {
		try {
			if (scrollState) {
				axe.utils.setScrollState(scrollState);
			}
			if (options.performanceTimer) {
				axe.utils.performanceTimer.auditEnd();
			}

			// Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
			var results = axe.utils.mergeResults(data.map(function (results) {
				return { results };
			}));

			// after should only run once, so ensure we are in the top level window
			if (context.initiator) {
				results = audit.after(results, options);

				results.forEach(axe.utils.publishMetaData);
				results = results.map(axe.utils.finalizeRuleResult);
			}
			try {
				complete(resolve, results);
			} catch(e) {
				complete(axe.log, e);
			}
		} catch (e) {
			complete(reject, e);
		}
	}).catch((e) => {
		complete(reject, e);
	});
}

axe._runRules = runRules;
