/*global axe */

axe.reset = function () {
	'use strict';
	var audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}
	audit.resetRulesAndChecks();	
};
