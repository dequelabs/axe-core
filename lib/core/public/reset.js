// TODO: axe._audit

function resetConfiguration() {
	'use strict';
	var audit = axe._audit;

	if (!audit) {
		throw new Error('No audit configured');
	}
	audit.resetRulesAndChecks();
}

// axe.reset = resetConfiguration;
export default resetConfiguration;
