/**
 * Regex for matching unicode values out of Basic Multilingual Plane (BMP)
 * Reference:
 * - https://github.com/mathiasbynens/regenerate
 * - https://unicode-table.com/
 * - https://mathiasbynens.be/notes/javascript-unicode
 *
 * @returns {RegExp}
 */
export function getUnicodeNonBmpRegExp() {
  /**
   * Regex for matching astral plane unicode
   * - http://kourge.net/projects/regexp-unicode-block
   */

  /**
   * Notes on various unicode planes being used in the regex below:
   * '\u1D00-\u1D7F'  Phonetic Extensions
   * '\u1D80-\u1DBF'  Phonetic Extensions Supplement
   * '\u1DC0-\u1DFF'  Combining Diacritical Marks Supplement
   * '\u20A0-\u20CF'  Currency symbols
   * '\u20D0-\u20FF'  Combining Diacritical Marks for Symbols
   * '\u2100-\u214F'  Letter like symbols
   * '\u2150-\u218F'  Number forms (eg: Roman numbers)
   * '\u2190-\u21FF'  Arrows
   * '\u2200-\u22FF'  Mathematical operators
   * '\u2300-\u23FF'  Misc Technical
   * '\u2400-\u243F'  Control pictures
   * '\u2440-\u245F'  OCR
   * '\u2460-\u24FF'  Enclosed alpha numerics
   * '\u2500-\u257F'  Box Drawing
   * '\u2580-\u259F'  Block Elements
   * '\u25A0-\u25FF'  Geometric Shapes
   * '\u2600-\u26FF'  Misc Symbols
   * '\u2700-\u27BF'  Dingbats
   * '\uE000-\uF8FF'  Private Use
   *
   * Note: plane '\u2000-\u206F' used for General punctuation is excluded as it is handled in -> getPunctuationRegExp
   */

  return /[\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u20A0-\u20CF\u20D0-\u20FF\u2100-\u214F\u2150-\u218F\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u2400-\u243F\u2440-\u245F\u2460-\u24FF\u2500-\u257F\u2580-\u259F\u25A0-\u25FF\u2600-\u26FF\u2700-\u27BF\uE000-\uF8FF]/g;
}

/**
 * Get regular expression for matching punctuations
 *
 * @returns {RegExp}
 */
export function getPunctuationRegExp() {
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
   *
   * CJK punctuation. Without these the same authoring pattern passes in English
   * and fails in Chinese, Japanese and Korean, where these forms are the norm.
   * -> \u3000-\u3004 \u3008-\u3020 \u3030 \u3036-\u3037 \u303D-\u303F CJK
   *    Symbols and Punctuation (、。「」〈〉 …). The block also holds letters,
   *    numbers and tone marks (々 〆 〇 〡-〩 〱-〵 …), so the range is split
   *    around them.
   * -> \u30FB Katakana Middle Dot (・)
   * -> \uFE10-\uFE1F Vertical Forms
   * -> \uFE30-\uFE4F CJK Compatibility Forms
   * -> \uFE50-\uFE6F Small Form Variants
   *
   * Halfwidth and Fullwidth Forms, punctuation only. The full-width letters and
   * digits inside this block (\uFF10-\uFF19, \uFF21-\uFF3A, \uFF41-\uFF5A) are
   * meaningful characters, so the range is split around them.
   * -> \uFF01-\uFF0F \uFF1A-\uFF20 \uFF3B-\uFF40 \uFF5B-\uFF65
   *
   * When we drop IE11 this whole list can become `/[\p{P}\p{S}]/gu`.
   */
  return /[\u2000-\u206F\u2E00-\u2E7F\u3000-\u3004\u3008-\u3020\u3030\u3036-\u3037\u303D-\u303F\u30FB\uFE10-\uFE1F\uFE30-\uFE4F\uFE50-\uFE6F\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\\'!"#$%&£¢¥§€()*+,\-.\/:;<=>?@\[\]^_`{|}~±]/g;
}

/**
 * Get regular expression for supplementary private use
 *
 * @returns {RegExp}
 */
export function getSupplementaryPrivateUseRegExp() {
  // Supplementary private use area A (https://www.unicode.org/charts/PDF/UF0000.pdf) contains
  // characters between F0000 and FFFFF. Because ES5 doesn't have a syntax for regular expressions
  // of such characters, search instead for the corresponding surrogate pairs.
  //
  // Code points FFFFD and FFFFF are "noncharacters", but the regex still matches them, because its
  // intent is to match things we don't want to check color contrast for. This is why the low
  // surrogate range in the regex ends at DFFF, not DFFD.
  //
  // 1. High surrogate area (https://www.unicode.org/charts/PDF/UD800.pdf)
  // 2. Low surrogate area (https://www.unicode.org/charts/PDF/UDC00.pdf)
  //
  //             1              2
  //      ┏━━━━━━┻━━━━━━┓┏━━━━━━┻━━━━━━┓
  return /[\uDB80-\uDBBF][\uDC00-\uDFFF]/g;
}

/**
 * Get regular expression for variation selectors, which only change how the
 * preceding character is displayed (e.g. U+FE0E for text presentation of an
 * emoji) and have no meaning on their own.
 * Reference:
 * - https://www.unicode.org/reports/tr51/#Emoji_Variation_Sequences
 *
 * 1. Mongolian free variation selectors
 * 2. Variation Selectors block
 * 3. Variation Selectors Supplement (U+E0100-E01EF) as surrogate pairs
 *
 * @returns {RegExp}
 */
export function getVariationSelectorRegExp() {
  //                1               2                  3
  //       ┏━━━━━━━━┻━━━━━━━━┓┏━━━━━┻━━━━━┓  ┏━━━━━━━━━┻━━━━━━━━━┓
  return /[\u180B-\u180D\u180F\uFE00-\uFE0F]|\uDB40[\uDD00-\uDDEF]/g;
}

/**
 * Get regular expression for unicode format category.
 * When we drop IE11 we can instead use unicode character escape `/p{Cf}/gu`
 * Reference:
 * - https://www.compart.com/en/unicode/category/Cf
 *
 * @returns {RegExp}
 */
export function getCategoryFormatRegExp() {
  return /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC38]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/g;
}
