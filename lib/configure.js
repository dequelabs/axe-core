/*global Audit */
dqre.configure = function (audit) {
	'use strict';

	dqre.audit = new Audit();
	for (var i = 0, l = audit.rules.length; i < l; i++) {
		dqre.audit.addRule(audit.rules[i]);
	}

	utils.respondable.subscribe('dqre.analysis.start', function (data, respond) {
		dqre.run((data && data.context) || document, function (data2) {
			respond(data2);
		});
	});
};