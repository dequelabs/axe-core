/*global Audit, runRules, runTool, cleanupTools, Rule, Tool */
var dqreConfiguration;

function unpackToObject(from, Constructor) {
	'use strict';

	var i, l, item, result = {};
	for (i = 0, l = from.length; i < l; i++) {
		item = from[i];
		result[item.id] = new Constructor(item);
	}

	return result;
}

function runCommand(data, callback) {
	'use strict';

	var context = (data && data.context) || {};
	if (context.include && !context.include.length) {
		context.include = [document];
	}
	var options = (data && data.options) || {};

	switch(data.command) {
		case 'rules':
			return runRules(context, options, callback);
		case 'run-tool':
			return runTool(data.parameter, data.selectorArray, options, callback);
		case 'cleanup-tool':
			return cleanupTools(callback);
	}
}

function setDefaultConfiguration(audit) {
	'use strict';

	dqreConfiguration = audit || {};
	dqreConfiguration.rules = dqreConfiguration.rules || [];
	dqreConfiguration.tools = dqreConfiguration.tools || [];
	dqreConfiguration.data = dqreConfiguration.data || {
		checks: {},
		rules: {}
	};
}

var styleSheet;
function injectStyle(style) {
	'use strict';

	if (styleSheet && styleSheet.parentNode) {
		styleSheet.parentNode.removeChild(styleSheet);
		styleSheet = null;
	}
	if (!style) {
		return;
	}

	var head = document.head || document.getElementsByTagName('head')[0];
	styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';

	if (styleSheet.styleSheet === undefined) { // Not old IE
		styleSheet.appendChild(document.createTextNode(style));
	} else {
		styleSheet.styleSheet.cssText = style;
	}

	head.appendChild(styleSheet);

	return styleSheet;
}


/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specifcation" object
 */
dqre.configure = function (audit) {
	'use strict';

	setDefaultConfiguration(audit);

	dqre.audit = new Audit();
	dqre.audit.version = audit.version;
	var i, l;
	for (i = 0, l = audit.rules.length; i < l; i++) {
		dqre.audit.rules.push(new Rule(audit.rules[i]));
	}
	dqre.audit.tools = unpackToObject(audit.tools, Tool);

	injectStyle(audit.style);

	utils.respondable.subscribe('dqre.ping', function (data, respond) {
		respond({dqre: true});
	});

	utils.respondable.subscribe('dqre.start', runCommand);
};
