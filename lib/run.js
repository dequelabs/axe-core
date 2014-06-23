/*global Context, DqElement */

/**
 * Adds the owning frame's CSS selector onto each instance of DqElement
 * @private
 * @param  {Array} resultSet `details` array on a `RuleResult`
 * @param  {HTMLElement} frameElement  The frame element
 * @param  {String} frameSelector     Unique CSS selector for the frame
 */
function pushFrame(resultSet, frameElement, frameSelector) {
	'use strict';
	resultSet.forEach(function (res) {
		res.node.frames.unshift(frameSelector);
		res.node = new DqElement(frameElement, res.node);
		res.checks.forEach(function (check) {
			check.relatedNodes.forEach(function (node) {
				node.frames.unshift(frameSelector);
				node = new DqElement(frameElement, node);
			});
		});
	});
}

/**
 * Adds `to` to `from` and then re-sorts by DOM order
 * @private
 * @param  {Array} from  `details` array on a `RuleResult`
 * @param  {Array} to   `details` array on a `RuleResult`
 * @return {Array}      The merged and sorted result
 */
function spliceDetails(from, to) {
	'use strict';

	return from.concat(to).sort(function (a, b) {
		var aEl = a.node.element,
			bEl = b.node.element;

		return utils.nodeSorter(aEl, bEl);
	});
}

/**
 * Merges one or more RuleResults (possibly from different frames) into one RuleResult
 * @private
 * @param  {Array} frameResults  Array of objects including the RuleResults as `results` and frame as `frame`
 * @return {Array}              The merged RuleResults; should only have one result per rule
 */
function mergeResults(frameResults) {
	'use strict';
	var result = [];
	frameResults.forEach(function (frameResult) {
		if (!frameResult.results || !frameResult.results.length) {
			return;
		}
		frameResult.results.forEach(function (ruleResult) {
			if (frameResult.frame) {
				pushFrame(ruleResult.details, frameResult.frameElement, frameResult.frame);
			}

			var res = utils.findBy(result, 'id', ruleResult.id);
			if (!res) {
				result.push(ruleResult);
			} else {
				if (ruleResult.details.length) {
					spliceDetails(res.details, ruleResult.details);
				}
			}
		});
	});
	return result;
}

/**
 * Sends a message to frames to start analysis and collate results (via `mergeResults`)
 * @private
 * @param  {Context}   context  The resolved Context object
 * @param  {Object}   options   Options object (as passed to `dqre.run`)
 * @param  {Function} callback  Function to call when results from all frames have returned
 */
function collectResultsFromFrames(context, options, callback) {
	'use strict';

	var q = utils.queue();
	var frames = context.frames;

	function defer(frame) {
		var node = frame.node,
			win = node.contentWindow;
		// If the frame responds, send messages to it.
		utils.respondable(win, 'dqre.analysis.ping', null, function () {
			q.defer(function (done) {
				utils.respondable(win, 'dqre.analysis.start', {
					options: options,
					context: {
						page: context.page,
						include: frame.include || [],
						exclude: frame.exclude || []
					}
				}, function (data) {
					done({
						results: data,
						frameElement: node,
						frame: utils.getSelector(node)
					});
				});
			});
		});
	}

	for (var i = 0, l = frames.length; i < l; i++) {
		defer(frames[i]);
	}


	setTimeout(function () {
		utils.respondable(window, 'dqre.analysis.ping', null, function () {
			q.then(function (data) {
				callback(mergeResults(data));
			});
		});
	}, 0);
}

/**
 * Starts analysis on the current document and its subframes
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} callback The function to invoke when analysis is complete; receives an array of `RuleResult`s
 */
dqre.run = function run(context, options, callback) {
	'use strict';
	context = new Context(context);

	if (dqre.audit) {
		var q = utils.queue();

		if (context.frames.length) {
			q.defer(collectResultsFromFrames, context, options);
		}
		q.defer(function (cb) {
			dqre.audit.run(context, options, cb);
		});
		q.then(function (data) {
			// Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
			var results = mergeResults(data.map(function (d) {
				return {
					results: d
				};
			}));

			// after should only run once, so ensure we are in the top level window
			if (window.top === window) {
				results = dqre.audit.after(results, options);
			}

			results.forEach(utils.calculateRuleResult);
			callback(results);
		});
	} else {
		throw new Error('No audit configured');
	}

};