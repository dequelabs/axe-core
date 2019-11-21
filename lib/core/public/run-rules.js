// TODO: axe._tree, axe._selectorData, axe._audit

/*exported runRules */
import Context from '../base/context.js';
import {
	queue,
	getSelectorData,
	performanceTimer,
	collectResultsFromFrames,
	getScrollState,
	setScrollState,
	mergeResults,
	publishMetaData,
	finalizeRuleResult,
	memoizedFns
} from '../utils/index.js';
import log from '../log.js';
import { cache } from '../base/index.js';

// Clean up after resolve / reject
function cleanup() {
	memoizedFns.forEach(fn => fn.clear());
	cache.clear();
	axe._tree = undefined;
	axe._selectorData = undefined;
}

/**
 * Starts analysis on the current document and its subframes
 * @private
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} resolve  Called when done running rules, receives ([results : Object], cleanup : Function)
 * @param  {Function} reject   Called when execution failed, receives (err : Error)
 */
function runRules(context, options, resolve, reject) {
	'use strict';
	try {
		context = new Context(context);
		axe._tree = context.flatTree;
		axe._selectorData = getSelectorData(context.flatTree);
	} catch (e) {
		cleanup();
		return reject(e);
	}

	var q = queue();
	var audit = axe._audit;

	if (options.performanceTimer) {
		performanceTimer.auditStart();
	}

	if (context.frames.length && options.iframes !== false) {
		q.defer(function(res, rej) {
			collectResultsFromFrames(context, options, 'rules', null, res, rej);
		});
	}
	let scrollState;
	q.defer(function(res, rej) {
		if (options.restoreScroll) {
			scrollState = getScrollState();
		}
		audit.run(context, options, res, rej);
	});
	q.then(function(data) {
		try {
			if (scrollState) {
				setScrollState(scrollState);
			}
			if (options.performanceTimer) {
				performanceTimer.auditEnd();
			}

			// Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
			var results = mergeResults(
				data.map(function(results) {
					return { results };
				})
			);

			// after should only run once, so ensure we are in the top level window
			if (context.initiator) {
				results = audit.after(results, options);

				results.forEach(publishMetaData);
				results = results.map(finalizeRuleResult);
			}
			try {
				resolve(results, cleanup);
			} catch (e) {
				cleanup();
				log(e);
			}
		} catch (e) {
			cleanup();
			reject(e);
		}
	}).catch(e => {
		cleanup();
		reject(e);
	});
}

// axe._runRules = runRules;
export default runRules;
