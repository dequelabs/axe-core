/*exported runFinder */
/*global pushFrame */

/**
 * Turn a complex context object into an array, where the first element
 * of the array is a Node, representing the context in the current frame.
 *
 * This context is simpler than the one associated with the Context
 * class in that it does not have to take into account includes and
 * excludes that could potentially overlap
 * @private
 * @param {Mixed} context a (selector|Node|Array of selectors)
 * @return {Array|undefined}
 */
function evaluateContext(context) {
	'use strict';
	if (!context || context.length === 0) {
		return [document];
	} else if ('string' === typeof context) {
		return [document.querySelector(context)];
	} else if (context.length) {
		context[0] = document.querySelector(context[0]);
		return context;
	} else {
		return [context];
	}
	return;
}

/**
 * Run a finder tool recursively in all the frames and return the matching
 * Nodes as an argument to the callback function. The results will bubble up from
 * the frames and will be augmented with a "node" attribute that represents the
 * matched element. This node will have a "selector" array and a "source" string
 * giving the address and HTML source code of the matched element
 *
 * @public
 * @param {String} finderId - the ID of the finder tool
 * @param {Mixed} context - a (selector|Node|Array of selectors) indicating which
 * sub-portion of the page to begin with (excludes all elements outside of this)
 * @param {String} selector - the selector string to use to find relevant elements
 * @param {Object} options - options passed to the finder tool
 * @param {Function} callback - the function to call when done, passing the results
 */
function runFinder(finderId, context, selector, options, callback) {
	/*jshint maxstatements:19 */
	'use strict';
	var frames;
	var q = utils.queue();
	var contextNode;

	if (!axe._audit) {
		throw new Error('No audit configured');
	}
	if (typeof callback !== 'function') {
		throw new Error('A callback function must be supplied');
	}
	context = evaluateContext(context);
	if (!context || !context[0]) {
		return callback([]);
	}
	contextNode = context.splice(0)[0];
	if (!context.length && contextNode.nodeName !== 'IFRAME' && contextNode.nodeName !== 'FRAME') {
		frames = utils.toArray(contextNode.querySelectorAll('iframe, frame'));
	} else {
		frames = [contextNode];
	}
	if (frames.length) {
		q.defer(function (done) {
			frames.forEach(function (frame) {
				axe.utils.sendCommandToFrame(frame, {
					options: options,
					command: 'run-finder',
					parameter: finderId,
					context: context,
					selector: selector
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
	if (!context.length) {
		q.defer(function (done) {
			var results = [];
			utils.toArray(contextNode.querySelectorAll(selector)).forEach(function(node) {
				axe._audit.finders[finderId].run(node, options, function (r) {
					if (r) {
						r.node = new utils.DqElement(node, null);
						results.push(r);
					}
				});
			});
			done({ results: results });
		});
	}
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

axe.finder = runFinder;
