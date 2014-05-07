

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
		res.node.frames.push(frame);
	});
}

function mergeFrameResults(frameResults) {
	'use strict';
	var result = [];
	frameResults.forEach(function (frameResult) {
		frameResult.results &&
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
				}
			}

		});
	});
	return result;
}

function collectResultsFromFrames(frames, context, callback) {
	'use strict';

	var q = utils.queue();

	function defer(win) {
		// If the frame responds, send messages to it.
		utils.respondable(win, 'dqre.analysis.ping', null, function () {
			q.defer(function (done) {
				utils.respondable(win, 'dqre.analysis.start', null, function (data) {
					done({
						results: data,
						frame: utils.getSelector(win.frameElement)
					});
				});
			});
		});
	}

	for (var i = 0, l = frames.length; i < l; i++) {
		defer(frames[i].contentWindow);
	}

	setTimeout(function () {
		utils.respondable(window, 'dqre.analysis.ping', null, function () {
			q.then(function (datas) {
				callback(mergeFrameResults(datas));
			});
		});
	}, 0);
}

dqre.run = function (context, callback) {
	'use strict';

	if (dqre.audit) {
		var q = utils.queue();

		var frames = utils.getFrames(context);
		if (frames.length) {
			q.defer(collectResultsFromFrames, frames, context);
		}
		q.defer(function (cb) {
			dqre.audit.run(context, cb);
		});
		q.then(function (datas) {
			console.log('fin', datas);
			callback(mergeResults(datas));
		});
	} else {
		throw new Error('No audit configured');
	}

};