/* global text */

/**
 * Replace punctuation's from a given string
 *
 * @method replacePunctuation
 * @memberof axe.commons.text
 * @instance
 * @param {String} str given string
 * @param {String} replaceWith (Optional) replacement string
 * @returns {String}
 */
text.replacePunctuation = function replacePunctuation(str, replaceWith = '') {
	return str.replace(getPunctuationRegExp(), replaceWith);
};

/**
 * Get regular expression for matching punctuations
 *
 * @returns {RegExp}
 */
function getPunctuationRegExp() {
	/**
	 * Reference: http://kunststube.net/encoding/
	 * US-ASCII
	 * -> !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
	 *
	 * General Punctuation block
	 * -> \u2000-\u206F
	 *
	 * Supplemental Punctuation block
	 * Reference: https://en.wikipedia.org/wiki/Supplemental_Punctuation
	 * -> \u2E00-\u2E7F Reference
	 */
	return /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
}
