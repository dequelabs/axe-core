import { resetStandards } from '../../standards';

function reset() {
	'use strict';
	var audit = axe._audit;

	if (!audit) {
		throw new Error('No audit configured');
	}
	audit.spec = null;
	audit.resetRulesAndChecks();
	resetStandards();
}

export default reset;
