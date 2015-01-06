/*global Audit, runAnalysis, Rule, Classifier */
var dqreConfiguration;

/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specifcation" object
 */
dqre.configure = function (audit) {
	'use strict';

	dqreConfiguration = audit || {};
	dqreConfiguration.rules = dqreConfiguration.rules || [];
	dqreConfiguration.classifiers = dqreConfiguration.classifiers || [];
	dqreConfiguration.data = dqreConfiguration.data || {
		checks: {},
		rules: {}
	};

	dqre.audit = new Audit();
	dqre.audit.version = audit.version;
	var i, l;
	for (i = 0, l = audit.rules.length; i < l; i++) {
		dqre.audit.rules.push(new Rule(audit.rules[i]));
	}
	for (i = 0, l = audit.classifiers.length; i < l; i++) {
		dqre.audit.classifiers.push(new Classifier(audit.classifiers[i]));
	}

	utils.respondable.subscribe('dqre.ping', function (data, respond) {
		respond({dqre: true});
	});

	utils.respondable.subscribe('dqre.start', function (data, respond) {

		var context = (data && data.context) || {};
		if (context.include && !context.include.length) {
			context.include = [document];
		}
		runAnalysis(context, (data && data.options) || {}, respond);
	});
};
