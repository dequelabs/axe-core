import {
  getUnicodeNonBmpRegExp,
  getSupplementaryPrivateUseRegExp,
  getPunctuationRegExp,
  getCategoryFormatRegExp
} from './unicode.js';
import { emojiRegexText } from '../../core/imports';

/**
 * Remove specified type(s) unicode characters
 *
 * @method removeUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to operate on
 * @param {Object} options config containing which unicode character sets to remove
 * @property {Boolean} options.emoji remove emoji unicode
 * @property {Boolean} options.nonBmp remove nonBmp unicode
 * @property {Boolean} options.punctuations remove punctuations unicode
 * @property {String} [options.replaceWith=''] string to substitute for each matched character (e.g. a space to preserve word boundaries)
 * @returns {String}
 */
function removeUnicode(str, options) {
  const { emoji, nonBmp, punctuations, replaceWith = '' } = options;

  if (emoji) {
    str = str.replace(emojiRegexText(), replaceWith);
  }
  if (nonBmp) {
    str = str
      .replace(getUnicodeNonBmpRegExp(), replaceWith)
      .replace(getSupplementaryPrivateUseRegExp(), replaceWith)
      .replace(getCategoryFormatRegExp(), replaceWith);
  }
  if (punctuations) {
    str = str.replace(getPunctuationRegExp(), replaceWith);
  }

  return str;
}

export default removeUnicode;
