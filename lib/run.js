/* global console, dqreConfiguration */

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

var mergeFrameResults = function (frameResults) {
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
};

var mergeResults = function (results) {
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
};

var collectResultsFromFrames = function (frames, context, options, callback) {
	'use strict';

	var q = utils.queue();

	function defer(win) {
		// If the frame responds, send messages to it.
		utils.respondable(win, 'dqre.analysis.ping', null, function () {
			q.defer(function (done) {
				utils.respondable(win, 'dqre.analysis.start', {options: options}, function (data) {
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
};

dqre.run = function (context, options, callback) {
	'use strict';

	if (dqre.audit) {
		var q = utils.queue();

		var frames = utils.getFrames(context);
		if (frames.length) {
			q.defer(collectResultsFromFrames, frames, context, options);
		}
		q.defer(function (cb) {
			dqre.audit.run(context, options, cb);
		});
		q.then(function (datas) {
			var results = mergeResults(datas);
			console.log('fin', datas);
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

var findCheckMessage = function (id) {
	'use strict';
	if (!dqreConfiguration || !dqreConfiguration.messages ||
		!dqreConfiguration.messages.checkHelp || !dqreConfiguration.messages.checkHelp[id]) {
		return '';
	}
	return dqreConfiguration.messages.checkHelp[id];
};

var failureSummary = function (ruleResult, nodeData) {
	'use strict';
	var message = '', fails = [];
	if (ruleResult.result !== dqre.constants.result.WARN && ruleResult.result !== dqre.constants.result.FAIL) {
		return undefined;
	}
	nodeData.checks.forEach(function (check) {
		var help = findCheckMessage(check.id);
		if (!check.value && help &&
			((check.result !== ruleResult.result && check.result === dqre.constants.result.PASS) ||
			(check.result === dqre.constants.result.WARN && check.result === ruleResult.result))) {
			fails.push(check);
		}
	});
	fails.forEach(function (check, index, arr) {
		var help = findCheckMessage(check.id);
		if (help && arr.length > (index + 1) && index && message.length) {
			message += ', ';
		} else if (help && index && message.length) {
			message += ' & ';
		}
		if (help) {
			message += help;
		}
	});
	return message;
};

var ruleHelp = function (ruleId) {
	'use strict';
	if (!dqreConfiguration || !dqreConfiguration.messages ||
		!dqreConfiguration.messages.ruleHelp || !dqreConfiguration.messages.ruleHelp[ruleId]) {
		return '';
	}
	return dqreConfiguration.messages.ruleHelp[ruleId];
};

var nodeSelectorArray = function (nodeData) {
	'use strict';
	var retVal = [];
	if (!nodeData || !nodeData.node || !nodeData.node.frames || !nodeData.node.selector) {
		return retVal;
	}
	nodeData.node.frames.forEach(function (frameSelector) {
		retVal.push(frameSelector);
	});
	retVal.push(nodeData.node.selector);
	return retVal;
};

dqre.a11yCheck = function (context, options, callback) {
	'use strict';

	dqre.run(context, options, function (results) {
		var checkResults = {
			violations: [],
			warnings: [],
			passes: []
		};
		// format the results correctly
		results.forEach(function (rr) {
			var rule = dqre.audit.findRule(rr.id),
				ruleResult = {
					id: rr.id,
					help: ruleHelp(rule.id),
					nodes: []
				};
			rr.details.forEach(function (nodeData) {
				ruleResult.nodes.push({
					failureSummary: failureSummary(rr, nodeData),
					checks: nodeData.checks,
					target: nodeSelectorArray(nodeData),
					html: nodeData.node.source
				});
			});
			if (rr.result === dqre.constants.result.PASS ||
				rr.result === dqre.constants.result.NA) {
				checkResults.passes.push(ruleResult);
			} else if (rr.result === dqre.constants.result.WARN) {
				checkResults.warnings.push(ruleResult);
			} else if (rr.result === dqre.constants.result.FAIL) {
				checkResults.violations.push(ruleResult);
			}
		});
		callback(checkResults);
	});
};