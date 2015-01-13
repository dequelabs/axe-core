/*global Audit, runRules, runClassifier, runAnalysis, runTool, Rule, Classifier, AnalysisRule, Tool */
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
		case 'classify':
			return runClassifier(data.parameter, context, options, callback);
		case 'analysis':
			return runAnalysis(data.parameter, data.selectorArray, options, callback);
		case 'tool':
			return runTool(data.parameter, data.selectorArray, options, callback);
	}
}

function setDefaultConfiguration(audit) {
	'use strict';

	dqreConfiguration = audit || {};
	dqreConfiguration.rules = dqreConfiguration.rules || [];
	dqreConfiguration.classifiers = dqreConfiguration.classifiers || [];
	dqreConfiguration.analyzers = dqreConfiguration.analyzers || [];
	dqreConfiguration.tools = dqreConfiguration.tools || [];
	dqreConfiguration.data = dqreConfiguration.data || {
		checks: {},
		rules: {}
	};
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
	dqre.audit.classifiers = unpackToObject(audit.classifiers, Classifier);
	dqre.audit.analyzers = unpackToObject(audit.analyzers, AnalysisRule);
	dqre.audit.tools = unpackToObject(audit.tools, Tool);


	utils.respondable.subscribe('dqre.ping', function (data, respond) {
		respond({dqre: true});
	});

	utils.respondable.subscribe('dqre.start', runCommand);
};
