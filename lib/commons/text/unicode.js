/* global text */

/**
 * Determine if a given string contains unicode character points of specified type
 * Allowed type(s):
 * - 'nonBmp' -> Non Bilingual Multi Plane
 * - 'emoji' -> Emoji
 *
 * @method hasUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to verify
 * @param {String} type type of unicode character set
 * @returns {Boolean}
 */
text.hasUnicode = function hasUnicode(str, type = 'nonBmp') {
	switch (type.toLowerCase()) {
		case 'emoji':
			return axe.imports.emojiRegexText().test(str);
		case 'nonbmp':
		default:
			return getUnicodeNonBmpRegExp().test(str);
	}
};

/**
 * Replace specified type unicode characters with supplied alternative
 * Allowed type(s):
 * - 'nonBmp' -> Non Bilingual Multi Plane
 * - 'emoji' -> Emoji
 *
 * @method replaceUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to operate on
 * @param {String} type type of unicode character set
 * @param {String} replaceWith alternative character for replacement
 * @returns {String}
 */
text.replaceUnicode = function replaceUnicode(
	str,
	type = 'nonBmp',
	replaceWith = ''
) {
	switch (type.toLowerCase()) {
		case 'emoji':
			return str.replace(axe.imports.emojiRegexText(), replaceWith);
		case 'nonbmp':
		default:
			return str.replace(getUnicodeNonBmpRegExp(), replaceWith);
	}
};

/**
 * Regex for matching unicode values out of Basic Multilingual Plane (BMP)
 * Reference:
 * - https://github.com/mathiasbynens/regenerate
 * - https://unicode-table.com/
 * - https://mathiasbynens.be/notes/javascript-unicode
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
