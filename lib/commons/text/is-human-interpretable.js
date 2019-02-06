/* global text */

/**
 * Determines if a given text is human friendly and interpretable
 *
 * @method isHumanInterpretable
 * @memberof axe.commons.text
 * @instance
 * @param  {String} str text to be validated
 * @returns {Number}
 */
text.isHumanInterpretable = function(str) {
	/**
	 * Steps:
	 * 1) Check for single character edge cases
	 * 		a) handle if character is alphanumeric & within the given icon mapping
	 * 					eg: x (close), i (info)
	 * 2) handle if character is a known punctuation used as a text
	 * 					eg: ? (help), > (next arrow), < (back arrow), need help ?
	 * 3) handle unicode from astral  (non bilingual multi plane) unicode and emoji
	 * 					eg: Windings font
	 * 					eg: '💪'
	 * 					eg: I saw a shooting 💫
	 */

	if (!str.length) {
		return 0;
	}

	// Step 1
	if (str.length === 1) {
		const alphaNumericIconMap = [
			'x', // close
			'i' // info
		];
		// Step 1a
		if (isAlphanumeric(str) && alphaNumericIconMap.includes(str)) {
			return 0;
		}
	}

	// Step 2
	if (text.hasPunctuation(str)) {
		if (text.sanitize(text.replacePunctuation(str)).length <= 0) {
			return 0;
		}
	}

	// Step 3
	// a - check for astral (non bilingual multi plane unicode)
	if (text.isNonBmpUnicode(str) || text.isEmojiUnicode(str)) {
		return 0;
	}

	return 1;
};

/**
 * Check if a given string is alphanumeric
 *
 * @private
 *
 * @param {String} str given string to validate
 * @return {Boolean}
 */
function isAlphanumeric(str) {
	const rExp = /^[0-9A-Za-z]+$/;
	return rExp.test(str);
}
