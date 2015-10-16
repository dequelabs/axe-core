/*global Audit, runRules, runTool, runFinder, runListener, endListener, cleanupTools */
function runCommand(data, keepalive, callback) {
	/*jshint maxcomplexity:11 */
	'use strict';

	var context = (data && data.context) || {};
	if (context.include && !context.include.length) {
		context.include = [document];
	}
	var options = (data && data.options) || {};

	switch (data.command) {
		case 'rules':
			return runRules(context, options, callback);
		case 'run-tool':
			return runTool(data.parameter, data.selectorArray, data.options, callback);
		case 'run-finder':
			return runFinder(data.parameter, data.context, data.selector, data.options, callback);
		case 'run-listener':
			return runListener(data.parameter, data.options, callback);
		case 'end-listener':
			return endListener(data.parameter, callback);
		case 'cleanup-tool':
			return cleanupTools(callback);
		default:
			// go through the registered commands
			if (axe._audit && axe._audit.commands && axe._audit.commands[data.command]) {
				return axe._audit.commands[data.command](data, callback);
			}
	}
}

/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specifcation" object
 * @private
 */
axe._load = function(audit) {
	'use strict';

	utils.respondable.subscribe('axe.ping', function(data, keepalive, respond) {
		respond({
			axe: true
		});
	});

	utils.respondable.subscribe('axe.start', runCommand);

	axe._audit = new Audit(audit);
};
