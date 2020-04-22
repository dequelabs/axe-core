import { getAudit } from '../globals';

function reset() {
	const audit = getAudit();

	if (!audit) {
		throw new Error('No audit configured');
	}
	audit.resetRulesAndChecks();
}

export default reset;
