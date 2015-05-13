/*global reporters */
dqre.configure = function (spec) {
	'use strict';

	var audit = dqre._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}

	if (spec.reporter && (typeof spec.reporter === 'function' || reporters[spec.reporter])) {
		audit.reporter = spec.reporter;
	}

};
