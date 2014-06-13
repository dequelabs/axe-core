/*global Context */

function pushFrame(resultSet, frame) {
	'use strict';
	resultSet.forEach(function (res) {
		res.node.frames.unshift(frame);
	});
}

function getElement(dqNode) {
	'use strict';

	if (dqNode.frames.length) {
		return document.querySelector(dqNode.frames[0]);
	}
	return document.querySelector(dqNode.selector);
}

function spliceDetails(from, to) {
	'use strict';

	return from.concat(to).sort(function (a, b) {
		var aEl = getElement(a.node),
			bEl = getElement(b.node);

		return utils.nodeSorter(aEl, bEl);
	});
}

function mergeResults(frameResults) {
	'use strict';
	var result = [];
	frameResults.forEach(function (frameResult) {
		if (!frameResult.results || !frameResult.results.length) {
			return;
		}
		frameResult.results.forEach(function (ruleResult) {
			if (frameResult.frame) {
				pushFrame(ruleResult.details, frameResult.frame);
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

function collectResultsFromFrames(frames, context, options, callback) {
	'use strict';

	var q = utils.queue();

	function defer(frame) {
		var win = frame.node.contentWindow;
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
						frameElement: win.frameElement,
						frame: utils.getSelector(win.frameElement)
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


dqre.run = function run(context, options, callback) {
	'use strict';
	context = new Context(context);

	if (dqre.audit) {
		var q = utils.queue();

		var frames = context.frames;
		if (frames.length) {
			q.defer(collectResultsFromFrames, frames, context, options);
		}
		q.defer(function (cb) {
			dqre.audit.run(context, options, cb);
		});
		q.then(function (data) {
			var results = mergeResults(data.map(function (d) {
				return {
					results: d
				};
			}));

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