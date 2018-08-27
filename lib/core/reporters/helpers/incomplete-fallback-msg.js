/*global helpers */

/**
 * Provides a fallback message in case incomplete checks don't provide one
 * This mechanism allows the string to be localized.
 * @return {String}
 */
helpers.incompleteFallbackMessage = function incompleteFallbackMessage() {
	'use strict';
	return axe._audit.data.incompleteFallbackMessage();
};
