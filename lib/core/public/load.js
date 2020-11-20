import Audit from '../base/audit';
import cleanup from './cleanup';
import runRules from './run-rules';

function runCommand(data, keepalive, callback) {
	var resolve = callback;
	var reject = function(err) {
		if (err instanceof Error === false) {
			err = new Error(err);
		}
		callback(err);
	};

	var context = (data && data.context) || {};
	if (context.hasOwnProperty('include') && !context.include.length) {
		context.include = [document];
	}
	var options = (data && data.options) || {};

	switch (data.command) {
		case 'rules':
			return runRules(
				context,
				options,
				function(results, cleanup) {
					resolve(results);
					// Cleanup AFTER resolve so that selectors can be generated
					cleanup();
				},
				reject
			);
		case 'cleanup-plugin':
			return cleanup(resolve, reject);
		default:
			// go through the registered commands
			if (
				axe._audit &&
				axe._audit.commands &&
				axe._audit.commands[data.command]
			) {
				return axe._audit.commands[data.command](data, callback);
			}
	}
}

/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specification" object
 * @private
 */
function load(audit) {
	axe.utils.respondable.subscribe('axe.ping', function(
		data,
		keepalive,
		respond
	) {
		respond({
			axe: true
		});
	});

	axe.utils.respondable.subscribe('axe.start', runCommand);

	axe._audit = new Audit(audit);
}

export default load;
