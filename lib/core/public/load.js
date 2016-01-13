/*global Audit, runRules, cleanupPlugins */
function runCommand(data, keepalive, callback) {
	'use strict';

	var context = (data && data.context) || {};
	if (context.include && !context.include.length) {
		context.include = [document];
	}
	var options = (data && data.options) || {};

	switch (data.command) {
		case 'rules':
			return runRules(context, options, callback);
		case 'cleanup-plugin':
			return cleanupPlugins(callback);
		default:
			// go through the registered commands
			if (axe._audit && axe._audit.commands && axe._audit.commands[data.command]) {
				return axe._audit.commands[data.command](data, callback);
			}
	}
}

/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specification" object
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
