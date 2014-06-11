/*global Audit */
var dqreConfiguration;

dqre.configure = function (audit) {
	'use strict';

	dqreConfiguration = audit || {};
	dqreConfiguration.messages = dqreConfiguration.messages || {};

	dqre.audit = new Audit();
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