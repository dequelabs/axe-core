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
 * @property {String} [options.replaceWith=''] literal string to substitute for each matched character (e.g. a space to preserve word boundaries)
 * @returns {String}
 */
function removeUnicode(str, options) {
  const { emoji, nonBmp, punctuations, replaceWith = '' } = options;
  // Use a replacer function so `replaceWith` is always inserted literally, i.e.
  // `$&`, `$'`, `$1`, etc. are not interpreted as `String.prototype.replace`
  // patterns.
  const replacer = () => replaceWith;

  if (emoji) {
    str = str.replace(emojiRegexText(), replacer);
  }
  if (nonBmp) {
    str = str
      .replace(getUnicodeNonBmpRegExp(), replacer)
      .replace(getSupplementaryPrivateUseRegExp(), replacer)
      .replace(getCategoryFormatRegExp(), replacer);
  }
  if (punctuations) {
    str = str.replace(getPunctuationRegExp(), replacer);
  }

  return str;
}

export default removeUnicode;
