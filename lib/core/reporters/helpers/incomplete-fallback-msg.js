import { getAudit } from '../../globals';

/**
 * Provides a fallback message in case incomplete checks don't provide one
 * This mechanism allows the string to be localized.
 * @return {String}
 */
function incompleteFallbackMessage() {
	const audit = getAudit();
	return typeof audit.data.incompleteFallbackMessage === 'function'
		? audit.data.incompleteFallbackMessage()
		: audit.data.incompleteFallbackMessage;
}

export default incompleteFallbackMessage;
