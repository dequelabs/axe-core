import removeUnicode from './remove-unicode';
import sanitize from './sanitize';

/**
 * Determines if a given text is human friendly and interpretable
 *
 * @method isHumanInterpretable
 * @memberof axe.commons.text
 * @instance
 * @param  {String} str text to be validated
 * @returns {Number} Between 0 and 1, (0 -> not interpretable, 1 -> interpretable)
 */
function isHumanInterpretable(str) {
  /**
   * Steps:
   * 1) Early escape if string is empty
   *
   * 2) Check for single alpha character edge cases
   *
   * 3) Check for symbolic text character edge cases
   * 		a) handle if character is alphanumeric & within the given icon mapping
   * 					eg: 'aA' for toggling capitalization
   *
   * 4) handle unicode from astral (non bilingual multi plane) unicode, emoji & punctuations
   * 					eg: Windings font
   * 					eg: '💪'
   * 					eg: I saw a shooting 💫
   * 					eg: ? (help), > (next arrow), < (back arrow), need help ?
   */

  if (
    isEmpty(str) ||
    isNonDigitCharacter(str) ||
    isSymbolicText(str) ||
    isUnicodeOrPunctuation(str)
  ) {
    return 0;
  }

  return 1;
}

function isEmpty(str) {
  return sanitize(str).length === 0;
}

function isNonDigitCharacter(str) {
  return str.length === 1 && str.match(/\D/);
}

function isSymbolicText(str) {
  const symbolicText = [
    'aa', // toggle capitalization (aA)
    'abc' // spelling
  ];

  return symbolicText.includes(str.toLowerCase());
}

function isUnicodeOrPunctuation(str) {
  const noUnicodeStr = removeUnicode(str, {
    emoji: true,
    nonBmp: true,
    punctuations: true
  });

  return !sanitize(noUnicodeStr);
}

export default isHumanInterpretable;
