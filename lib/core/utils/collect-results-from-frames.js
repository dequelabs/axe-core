import queue from './queue';
import sendCommandToFrame from './send-command-to-frame';
import mergeResults from './merge-results';
import getSelector from './get-selector';

/**
 * Sends a message to axe running in frames to start analysis and collate results (via `mergeResults`)
 * @private
 * @param  {Context}  context   The resolved Context object
 * @param  {Object}   options   Options object (as passed to `runRules`)
 * @param  {string}   command   Command sent to all frames
 * @param  {Array}    parameter Array of values to be passed along side the command
 * @param  {Function} callback  Function to call when results from all frames have returned
 */
function collectResultsFromFrames(
	context,
	options,
	command,
	parameter,
	resolve,
	reject
) {
	var q = queue();
	var frames = context.frames;

	// Tell each axe running in each frame to collect results
	frames.forEach(function(frame) {
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
			sendCommandToFrame(
				node,
				params,
				function(data) {
					if (data) {
						return res({
							results: data,
							frameElement: node,
							frame: getSelector(node)
						});
					}
					res(null);
				},
				rej
			);
		});
	});

	// Combine results from all frames and give it back
	q.then(function(data) {
		resolve(mergeResults(data, options));
	}).catch(reject);
}

export default collectResultsFromFrames;
