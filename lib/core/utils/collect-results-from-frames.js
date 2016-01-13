/**
 * Sends a command to an instance of axe in the specified frame
 * @param  {Element}  node       The frame element to send the message to
 * @param  {Object}   parameters Parameters to pass to the frame
 * @param  {Function} callback   Function to call when results from the frame has returned
 */
utils.sendCommandToFrame = function(node, parameters, callback) {
	'use strict';

	var win = node.contentWindow;
	if (!win) {
		axe.log('Frame does not have a content window', node);
		return callback({});
	}

	// give the frame .5s to respond to 'axe.ping', else log failed response
	var timeout = setTimeout(function() {
		timeout = setTimeout(function() {
			axe.log('No response from frame: ', node);
			callback(null);
		}, 0);
	}, 500);

	// send 'axe.ping' to the frame
	utils.respondable(win, 'axe.ping', null, undefined, function() {
		clearTimeout(timeout);

		// Give aXe 30s to respond to 'axe.start'
		timeout = setTimeout(function() {
			axe.log('Error returning results from frame: ', node);
			callback({});
			callback = null;
		}, 30000);

		// send 'axe.start' and send the callback if it responded
		utils.respondable(win, 'axe.start', parameters, undefined, function(data, keepalive) {
			clearTimeout(timeout);
			if (callback) {
				callback(data, keepalive);
			}
		});
	});

};


/**
 * Sends a message to axe running in frames to start analysis and collate results (via `mergeResults`)
 * @private
 * @param  {Context}  context   The resolved Context object
 * @param  {Object}   options   Options object (as passed to `runRules`)
 * @param  {string}   command   Command sent to all frames
 * @param  {Array}    parameter Array of values to be passed along side the command
 * @param  {Function} callback  Function to call when results from all frames have returned
 */
utils.collectResultsFromFrames = function collectResultsFromFrames(context, options, command, parameter, callback) {
	'use strict';

	var q = utils.queue();
	var frames = context.frames;

	// Tell each axe running in each frame to collect results
	frames.forEach(function (frame) {
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
	});

	// Combine results from all frames and give it back
	q.then(function(data) {
		callback(utils.mergeResults(data));
	});
};
