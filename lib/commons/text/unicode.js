/* global text */

/**
 * Regex for matching unicode values out of Basic Multilingual Plane (BMP)
 *
 * Reference:
 * - https://github.com/mathiasbynens/regenerate
 * - https://unicode-table.com/
 * - https://mathiasbynens.be/notes/javascript-unicode
 * -
 */

/**
 * Determine if a given string contains code points that are not from basic multilingual plane
 *
 * @method isNonBmpUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to verify
 * @returns {Boolean}
 */
text.isNonBmpUnicode = function isNonBmpUnicode(str) {
	return getUnicodeNonBmpRegExp().test(str);
};

/**
 * Replace non basic multilingual plane characters with supplied alternative
 *
 * @method replaceNonBmpUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to operate on
 * @returns {String}
 */
text.replaceNonBmpUnicode = function replaceNonBmpUnicode(
	str,
	replaceWith = ''
) {
	return str.replace(getUnicodeNonBmpRegExp(), replaceWith);
};

/**
 * Determine if a given string contains emoji
 *
 * @method isEmojiUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to verify
 * @returns {Boolean}
 */
text.isEmojiUnicode = function isEmojiUnicode(str) {
	return axe.imports.emojiRegexText().test(str);
};

/**
 * Replace astral plane unicode with a given replacement value
 *
 * @method replaceEmojiUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to operate on
 * @returns {String}
 */
text.replaceEmojiUnicode = function replaceEmojiUnicode(str, replaceWith = '') {
	return str.replace(axe.imports.emojiRegexText(), replaceWith);
};

/**
 * Get regular expression for matching unicode
 *
 * @returns {RegExp}
 */
function getUnicodeNonBmpRegExp() {
	/**
	 * Regex for matching astral plane unicode
	 * - http://kourge.net/projects/regexp-unicode-block
	 */
	return new RegExp(
		'[' +
		'\u1D00-\u1D7F' + // Phonetic Extensions
		'\u1D80-\u1DBF' + // Phonetic Extensions Supplement
		'\u1DC0-\u1DFF' + // Combining Diacritical Marks Supplement
		'\u2000-\u206F' + // General punctuation
		'\u20A0-\u20CF' + // Currency symbols
		'\u20D0-\u20FF' + // Combining Diacritical Marks for Symbols
		'\u2100-\u214F' + // Letter like symbols
		'\u2150-\u218F' + // Number forms (eg: Roman numbers)
		'\u2190-\u21FF' + // Arrows
		'\u2200-\u22FF' + // Mathematical operators
		'\u2300-\u23FF' + // Misc Technical
		'\u2400-\u243F' + // Control pictures
		'\u2440-\u245F' + // OCR
		'\u2460-\u24FF' + // Enclosed alpha numerics
		'\u2500-\u257F' + // Box Drawing
		'\u2580-\u259F' + // Block Elements
		'\u25A0-\u25FF' + // Geometric Shapes
		'\u2600-\u26FF' + // Misc Symbols
		'\u2700-\u27BF' + // Dingbats
			']'
	);
}
