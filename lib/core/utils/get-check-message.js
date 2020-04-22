import processMessage from './process-message';
import { getAudit } from '../globals';

/**
 * Get the pass, fail, or incomplete message for a check.
 * @param {String} checkId The check id
 * @param {String} type The message type ('pass', 'fail', or 'incomplete')
 * @param {Object} [data] The check data
 * @return {String}
 */
function getCheckMessage(checkId, type, data) {
	const check = getAudit().data.checks[checkId];

	if (!check) {
		throw new Error(`Cannot get message for unknown check: ${checkId}.`);
	}
	if (!check.messages[type]) {
		throw new Error(`Check "${checkId}"" does not have a "${type}" message.`);
	}

	return processMessage(check.messages[type], data);
}

export default getCheckMessage;
