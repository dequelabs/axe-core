/*global Context */
function findResult(ruleId, ruleResults) {
	'use strict';
	for (var i = 0, l = ruleResults.length; i < l; i++) {
		if (ruleResults[i].id === ruleId) {
			return i;
		}
	}

	return -1;
}

function pushFrame(resultSet, frame) {
	'use strict';
	resultSet.forEach(function (res) {
		// This uses unshift to insert the frame at the beginning
		// because the frames return from innermost first
		// and we want the order to be the order in which you would execute
		// the selectors to get to these frames
		res.node.frames.unshift(frame);
	});
}

function mergeFrameResults(frameResults) {
	'use strict';
	var result = [];
	frameResults.forEach(function (frameResult) {
		if (!frameResult.results) {
			return;
		}
		frameResult.results.forEach(function (ruleResult) {
			pushFrame(ruleResult.details, frameResult.frame);
			var index = findResult(ruleResult.id, result);
			if (index === -1) {
				result.push(ruleResult);
			} else {
				if (ruleResult.details.length) {
					result[index].details = result[index].details.concat(ruleResult.details);
				}
			}
		});
	});
	return result;
}

function mergeResults(results) {
	'use strict';
	var result = [];
	results.forEach(function (res) {
		res.forEach(function (ruleResult) {
			var index = findResult(ruleResult.id, result);
			if (index === -1) {
				result.push(ruleResult);
			} else {
				if (ruleResult.details.length) {
					result[index].details = result[index].details.concat(ruleResult.details);
					if (result[index].result === dqre.constants.result.FAIL ||
						ruleResult.result === dqre.constants.result.FAIL) {
						result[index].result = dqre.constants.result.FAIL;
					} else if (result[index].result === dqre.constants.result.WARN ||
								ruleResult.result === dqre.constants.result.WARN) {
						result[index].result = dqre.constants.result.WARN;
					} else if (result[index].result === dqre.constants.result.PASS ||
								ruleResult.result === dqre.constants.result.PASS) {
						result[index].result = dqre.constants.result.PASS;
					} else {
						result[index].result = ruleResult.result;
					}
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
			q.then(function (datas) {
				callback(mergeFrameResults(datas));
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
		q.then(function (datas) {
			var results = mergeResults(datas);

			if (window.top === window) {
				dqre.audit.after(context, options, results, callback);
			} else {
				callback(results);
			}
		});
	} else {
		throw new Error('No audit configured');
	}

};