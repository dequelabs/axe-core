import Context from '../base/context';
import cache from '../base/cache';
import { clearMemoziedFunctions } from '../utils/memoize';
import {
	getSelectorData,
	queue,
	performanceTimer,
	collectResultsFromFrames,
	getScrollState,
	setScrollState,
	mergeResults,
	publishMetaData,
	finalizeRuleResult
} from '../utils';
import { getAudit } from '../globals';
import log from '../log';

// Clean up after resolve / reject
function cleanup() {
	clearMemoziedFunctions();
	cache.clear();
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

		cache.set('tree', context.flatTree);
		cache.set('selectorData', getSelectorData(context.flatTree));
	} catch (e) {
		cleanup();
		return reject(e);
	}

	const q = queue();
	const audit = getAudit();

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

export default runRules;
