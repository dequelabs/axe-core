/*exported runListener, endListener */
/*global pushFrame */

/**
 * Run a listener tool recursively in all the frames and return the resulting
 * Nodes as an argument to the callback function. The results will bubble up from
 * the frames.
 *
 * @public
 * @param {String} listenerId - the ID of the listener
 * @param {Object} options - options passed to the listener
 * @param {Function} callback - the function to call when done, passing the results
 */
function runListener(listenerId, options, callback) {
	'use strict';
	var frames;
	var q = utils.queue();

	if (!axe._audit) {
		throw new Error('No audit configured');
	}
	if (typeof callback !== 'function') {
		throw new Error('A callback function must be supplied');
	}
	frames = utils.toArray(document.querySelectorAll('iframe, frame'));
	if (frames.length) {
		frames.forEach(function (frame) {
			q.defer(function (done) {
				axe.utils.sendCommandToFrame(frame, {
					options: options,
					command: 'run-listener',
					parameter: listenerId
				}, function (data) {
					if (data) {
						return done({
							results: data,
							frameElement: frame,
							frame: utils.getSelector(frame)
						});
					}
					done(null);
				});
			});
		});
	}
	q.defer(function (done) {
		axe._audit.listeners[listenerId].run(options, function (r) {
			done({ results: r });
		});
		if (window === window.top) {
			var endQ = utils.queue();
			// top frame gets to decide when the listening is over
			axe._audit.listeners[listenerId].control(function () {
				if (frames.length) {
					frames.forEach(function (frame) {
						endQ.defer(function(done) {
							axe.utils.sendCommandToFrame(frame, {
								options: options,
								command: 'end-listener',
								parameter: listenerId
							}, function () {
								done();
							});
						});
					});
				}
				endQ.then(function (){
					axe._audit.listeners[listenerId].end();
				});
			});
		}
	});
	q.then(function (data) {
		// merge the results from each frame
		var results = [];
		data.forEach(function (frameResult) {
			if (frameResult && frameResult.results && frameResult.results.length) {
				if (frameResult.frame) {
					pushFrame(frameResult.results, frameResult.frameElement, frameResult.frame);
				}
				results = results.concat(frameResult.results);
			}
		});
		results.forEach(function (item) {
			if (item.node && item.node.element) {
				delete item.node.element; // make the result serializable
			}
		});
		callback(results);
	});
}

function endListener(listenerId, callback) {
	'use strict';
	var frames;

	if (!axe._audit) {
		throw new Error('No audit configured');
	}
	if (typeof callback !== 'function') {
		throw new Error('A callback function must be supplied');
	}
	frames = utils.toArray(document.querySelectorAll('iframe, frame'));
	if (frames.length) {
		frames.forEach(function (frame) {
			axe.utils.sendCommandToFrame(frame, {
				command: 'end-listener',
				parameter: listenerId
			}, function () {
				// call the controller's end to return the final results
				axe._audit.listeners[listenerId].end();
				callback();
			});
		});
	} else {
		axe._audit.listeners[listenerId].end();
		callback();
	}
}

axe.listener = runListener;
