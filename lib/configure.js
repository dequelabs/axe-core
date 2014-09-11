/*global Audit */
var dqreConfiguration;

/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specifcation" object
 */
dqre.configure = function (audit) {
	'use strict';

	dqreConfiguration = audit || {};
	dqreConfiguration.data = dqreConfiguration.data || {
		checks: {},
		rules: {}
	};

	dqre.audit = new Audit();
	dqre.audit.version = audit.version;
	for (var i = 0, l = audit.rules.length; i < l; i++) {
		dqre.audit.addRule(audit.rules[i]);
	}

	utils.respondable.subscribe('dqre.analysis.ping', function (data, respond) {
		respond({dqre: true});
	});

	utils.respondable.subscribe('dqre.analysis.start', function (data, respond) {

		var context = (data && data.context) || {};
		if (context.include && !context.include.length) {
			context.include = [document];
		}
		dqre.run(context, (data && data.options) || {}, function (data2) {
			respond(data2);
		});
	});
};