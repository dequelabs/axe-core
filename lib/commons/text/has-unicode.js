import {
  getUnicodeNonBmpRegExp,
  getSupplementaryPrivateUseRegExp,
  getPunctuationRegExp,
  getCategoryFormatRegExp
} from './unicode';
import { emojiRegexText } from '../../core/imports';

/**
 * Determine if a given string contains unicode characters, specified in options
 *
 * @method hasUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to verify
 * @param {Object} options config containing which unicode character sets to verify
 * @property {Boolean} options.emoji verify emoji unicode
 * @property {Boolean} options.nonBmp verify nonBmp unicode
 * @property {Boolean} options.punctuations verify punctuations unicode
 * @returns {Boolean}
 */
function hasUnicode(str, options) {
  const { emoji, nonBmp, punctuations } = options;
  let value = false;

  if (emoji) {
    value ||= emojiRegexText().test(str);
  }
  if (nonBmp) {
    value ||=
      getUnicodeNonBmpRegExp().test(str) ||
      getSupplementaryPrivateUseRegExp().test(str) ||
      getCategoryFormatRegExp().test(str);
  }
  if (punctuations) {
    value ||= getPunctuationRegExp().test(str);
  }

  return value;
}

export default hasUnicode;
