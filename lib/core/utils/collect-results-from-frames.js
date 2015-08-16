/**
 * Sends a command to the sepecified frame
 * @param  {Element}  node       The frame element to send the message to
 * @param  {Object}   parameters Parameters to pass to the frame
 * @param  {Function} callback   Function to call when results from all frames have returned
 */
utils.sendCommandToFrame = function(node, parameters, callback) {
	'use strict';

	var win = node.contentWindow;
	if (!win) {
		axe.log('Frame does not have a content window', node);
		return callback({});
	}

	var timeout = setTimeout(function() {
		timeout = setTimeout(function() {
			axe.log('No response from frame: ', node);
			callback(null);
		}, 0);
	}, 500);

	utils.respondable(win, 'axe.ping', null, function() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			axe.log('Error returning results from frame: ', node);
			callback({});
			callback = null;
		}, 30000);
		utils.respondable(win, 'axe.start', parameters, function(data) {
			clearTimeout(timeout);
			if (callback) {
				callback(data);
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
utils.collectResultsFromFrames = function collectResultsFromFrames(context, options, command, parameter, callback) {
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

		q.defer(function(done) {
			var node = frame.node;
			utils.sendCommandToFrame(node, params, function(data) {
				if (data) {
					return done({
						results: data,
						frameElement: node,
						frame: utils.getSelector(node)
					});
				}
				done(null);
			});
		});
	}

	for (var i = 0, l = frames.length; i < l; i++) {
		defer(frames[i]);
	}

	q.then(function(data) {
		callback(utils.mergeResults(data));
	});
};
