/* global text */

/**
 * Determines if a given text is human friendly and interpretable
 *
 * @method isHumanInterpretable
 * @memberof axe.commons.text
 * @instance
 * @param  {String} str text to be validated
 * @returns {Number} Between 0 and 1, (0 -> not interpretable, 1 -> interpretable)
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
		if (alphaNumericIconMap.includes(str)) {
			return 0;
		}
	}

	// Step 2 - handle punctuation

	if (!text.sanitize(text.replacePunctuation(str)).length) {
		return 0;
	}

	// Step 3
	// a - check for astral (non bilingual multi plane unicode)
	if (
		!text.sanitize(text.replaceNonBmpUnicode(text.replaceEmojiUnicode(str)))
	) {
		return 0;
	}

	return 1;
};
