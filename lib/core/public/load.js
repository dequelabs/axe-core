/*global Audit, runRules, runTool, cleanupTools */
function runCommand(data, callback) {
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
			runTool(data.parameter, data.selectorArray);
			return callback();
		case 'cleanup-tool':
			return cleanupTools(callback);
	}
}

/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specifcation" object
 * @private
 */
axe._load = function(audit) {
	'use strict';

	utils.respondable.subscribe('axe.ping', function(data, respond) {
		respond({
			axe: true
		});
	});

	utils.respondable.subscribe('axe.start', runCommand);

	axe._audit = new Audit(audit);
};
