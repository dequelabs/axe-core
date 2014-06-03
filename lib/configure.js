/*global Audit */
/*exports dqreConfiguration */
var dqreConfiguration;

dqre.configure = function (audit) {
	'use strict';

	dqreConfiguration = audit;
	dqre.audit = new Audit();
	for (var i = 0, l = audit.rules.length; i < l; i++) {
		dqre.audit.addRule(audit.rules[i]);
	}

	utils.respondable.subscribe('dqre.analysis.ping', function (data, respond) {
		respond({dqre: true});
	});

	utils.respondable.subscribe('dqre.analysis.start', function (data, respond) {
		dqre.run((data && data.context) || document, (data && data.options) || {}, function (data2) {
			respond(data2);
		});
	});
};