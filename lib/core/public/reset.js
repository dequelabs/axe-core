/*global axe */
const resetConfiguration = () => {
	'use strict';
	var audit = axe._audit;

	if (!audit) {
		throw new Error('No audit configured');
	}
	audit.resetRulesAndChecks();
};

export default resetConfiguration;
