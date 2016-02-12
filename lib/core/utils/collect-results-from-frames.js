
function err(message, node) {
	'use strict';
	return new Error(message + ': ' + utils.getSelector(node));
}

/**
 * Sends a command to the sepecified frame
 * @param  {Element}  node       The frame element to send the message to
 * @param  {Object}   parameters Parameters to pass to the frame
 * @param  {Function} callback   Function to call when results from all frames have returned
 */
utils.sendCommandToFrame = function(node, parameters, resolve, reject) {
	'use strict';

	var win = node.contentWindow;
	if (!win) {
		axe.log('Frame does not have a content window', node);
		resolve({});
		return;
	}

	var timeout = setTimeout(function() {
		reject(err('No response from frame', node));
	}, 500);

	utils.respondable(win, 'axe.ping', null, undefined, function() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			reject(err('Axe in frame timed out', node));
		}, 30000);

		utils.respondable(win, 'axe.start', parameters, true, function(data) {
			clearTimeout(timeout);
			if (data instanceof Error === false) {
				resolve(data);
			} else {
				reject(data);
			}
		});
	});

};


/**
 * Sends a message to frames to start analysis and collate results (via `mergeResults`)
 * @private
 * @param  {Context}   context  The resolved Context object
 * @param  {Object}   options   Options object (as passed to `runRules`)
 * @param  {Function} callback  Function to call when results from all frames have returned
 */
function collectResultsFromFrames(context, options, command, parameter, resolve, reject) {
	'use strict';

	var q = utils.queue();
	var frames = context.frames;

	function defer(frame) {
		var params = {
			options: options,
			command: command,
			parameter: parameter,
			context: {
				initiator: false,
				page: context.page,
				include: frame.include || [],
				exclude: frame.exclude || []
			}
		};

		q.defer(function(res, rej) {
			var node = frame.node;
			utils.sendCommandToFrame(node, params, function(data) {
				if (data) {
					return res({
						results: data,
						frameElement: node,
						frame: utils.getSelector(node)
					});
				}
				res(null);
			}, rej);
		});
	}

	for (var i = 0, l = frames.length; i < l; i++) {
		defer(frames[i]);
	}

	q.then(function(data) {
		resolve(utils.mergeResults(data));
	}).catch(reject);
}

utils.collectResultsFromFrames = collectResultsFromFrames;
