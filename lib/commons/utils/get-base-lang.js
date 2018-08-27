/* global axe */
/**
 * Convenience function to extract primary language subtag from a given value
 * @method getBaseLang
 * @memberof axe.commons.utils
 * @instance
 * @param {String} value value specified as lang or xml:lang attribute
 * @return {String}
 */
axe.utils.getBaseLang = function getBaseLang(lang) {
	if (!lang) {
		return '';
	}
	return lang
		.trim()
		.split('-')[0]
		.toLowerCase();
};
