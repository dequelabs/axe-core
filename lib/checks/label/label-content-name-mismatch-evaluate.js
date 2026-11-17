import {
  accessibleText,
  isHumanInterpretable,
  removeUnicode,
  sanitize,
  visibleVirtual
} from '../../commons/text';
import { getRole } from '../../commons/aria';

// taken from https://github.com/ar-nelson/foldcase which needed to be updated
// as it is out of date (clone the repo, run the `codegen` script, then copy
// just the full object contents)
const fullCaseFold = {
  '\u{1DF95}': '\u0073\u0073',
  ᾀ: '\u03B9\u1F00',
  ᾁ: '\u03B9\u1F01',
  ᾂ: '\u03B9\u1F02',
  ᾃ: '\u03B9\u1F03',
  ᾄ: '\u03B9\u1F04',
  ᾅ: '\u03B9\u1F05',
  ῢ: '\u0308\u0300\u03C5',
  ᾆ: '\u03B9\u1F06',
  ΰ: '\u0308\u0301\u03C5',
  ᾇ: '\u03B9\u1F07',
  ῤ: '\u0313\u03C1',
  ᾈ: '\u03B9\u1F00',
  ᾉ: '\u03B9\u1F01',
  ῦ: '\u0342\u03C5',
  ῧ: '\u0308\u0342\u03C5',
  ᾊ: '\u03B9\u1F02',
  ᾋ: '\u03B9\u1F03',
  ᾌ: '\u03B9\u1F04',
  ᾍ: '\u03B9\u1F05',
  ᾎ: '\u03B9\u1F06',
  ᾏ: '\u03B9\u1F07',
  ᾐ: '\u03B9\u1F20',
  ᾑ: '\u03B9\u1F21',
  ᾒ: '\u03B9\u1F22',
  ᾓ: '\u03B9\u1F23',
  ᾔ: '\u03B9\u1F24',
  ᾕ: '\u03B9\u1F25',
  ῲ: '\u03B9\u1F7C',
  ᾖ: '\u03B9\u1F26',
  ῳ: '\u03B9\u03C9',
  ᾗ: '\u03B9\u1F27',
  ῴ: '\u03B9\u03CE',
  ᾘ: '\u03B9\u1F20',
  ᾙ: '\u03B9\u1F21',
  ῶ: '\u0342\u03C9',
  ῷ: '\u0342\u03B9\u03C9',
  ᾚ: '\u03B9\u1F22',
  ᾛ: '\u03B9\u1F23',
  ᾜ: '\u03B9\u1F24',
  ᾝ: '\u03B9\u1F25',
  ᾞ: '\u03B9\u1F26',
  ᾟ: '\u03B9\u1F27',
  ῼ: '\u03B9\u03C9',
  ΰ: '\u0308\u0301\u03C5',
  ß: '\u0073\u0073',
  ǰ: '\u030C\u006A',
  İ: '\u0307\u0069',
  ẖ: '\u0331\u0068',
  ẗ: '\u0308\u0074',
  ẘ: '\u030A\u0077',
  և: '\u0582\u0565',
  ẙ: '\u030A\u0079',
  ᾠ: '\u03B9\u1F60',
  ᾡ: '\u03B9\u1F61',
  ᾢ: '\u03B9\u1F62',
  ᾣ: '\u03B9\u1F63',
  ᾤ: '\u03B9\u1F64',
  ᾥ: '\u03B9\u1F65',
  ᾦ: '\u03B9\u1F66',
  ᾧ: '\u03B9\u1F67',
  ẚ: '\u02BE\u0061',
  ᾨ: '\u03B9\u1F60',
  ᾩ: '\u03B9\u1F61',
  ẞ: '\u0073\u0073',
  ᾪ: '\u03B9\u1F62',
  ᾫ: '\u03B9\u1F63',
  ᾬ: '\u03B9\u1F64',
  ᾭ: '\u03B9\u1F65',
  ᾮ: '\u03B9\u1F66',
  ᾯ: '\u03B9\u1F67',
  ὐ: '\u0313\u03C5',
  ὒ: '\u0313\u0300\u03C5',
  ὔ: '\u0313\u0301\u03C5',
  ᾲ: '\u03B9\u1F70',
  ŉ: '\u006E\u02BC',
  ὖ: '\u0313\u0342\u03C5',
  ᾳ: '\u03B9\u03B1',
  ᾴ: '\u03B9\u03AC',
  ᾶ: '\u0342\u03B1',
  ᾷ: '\u0342\u03B9\u03B1',
  ﬀ: '\u0066\u0066',
  ﬁ: '\u0069\u0066',
  ﬂ: '\u006C\u0066',
  ﬃ: '\u0066\u0069\u0066',
  ﬄ: '\u0066\u006C\u0066',
  ﬅ: '\u0074\u0073',
  ﬆ: '\u0074\u0073',
  ᾼ: '\u03B9\u03B1',
  ῂ: '\u03B9\u1F74',
  ῃ: '\u03B9\u03B7',
  ῄ: '\u03B9\u03AE',
  ῆ: '\u0342\u03B7',
  ῇ: '\u0342\u03B9\u03B7',
  ﬓ: '\u0576\u0574',
  ﬔ: '\u0565\u0574',
  ﬕ: '\u056B\u0574',
  ﬖ: '\u0576\u057E',
  ﬗ: '\u056D\u0574',
  ῌ: '\u03B9\u03B7',
  ῒ: '\u0308\u0300\u03B9',
  ΐ: '\u0308\u0301\u03B9',
  ῖ: '\u0342\u03B9',
  ῗ: '\u0308\u0342\u03B9',
  ΐ: '\u0308\u0301\u03B9'
};
function foldcase(s) {
  return Array.from(s)
    .map(c => fullCaseFold[c] || c)
    .join('');
}

// Anything that is not a letter or a number. Babel compiles the property
// escapes into plain ranges for older browsers.
const NON_LETTER_OR_NUMBER = /[^\p{L}\p{N}]/gu;

/**
 * Check whether the visible label's words appear as a contiguous run of words
 * within the accessible name.
 *
 * @param {String} label visible label text
 * @param {String} name accessible name
 * @returns {Boolean}
 */
function isLabelContainedInName(label, name) {
  const labelTokens = curateTokens(label);
  // An empty list is a contiguous subsequence of any list, so a label left with
  // no words is contained in every name.
  if (!labelTokens.length) {
    return true;
  }
  const nameTokens = curateTokens(name);
  if (!nameTokens.length) {
    return false;
  }
  return isContiguousSubsequence(nameTokens, labelTokens);
}

/**
 * Remove parenthesised content, including nested pairs.
 *
 * @param {String} str
 * @returns {String}
 */
function removeParentheticals(str) {
  let previous;
  do {
    previous = str;
    str = str.replace(/\([^()]*\)/g, '');
  } while (str !== previous);
  return str;
}

/**
 * Split text into words following the tokenize steps of the ACT label in name
 * algorithm: https://www.w3.org/WAI/standards-guidelines/act/rules/2ee8b8/proposed/#label-in-name-algorithm
 *
 * @param {String} str given text to tokenize
 * @returns {String[]}
 */
function curateTokens(str) {
  let text = str;
  // Step 2. The text is already lower-cased by the caller. IE11 does not
  // support String.prototype.normalize
  if (typeof text.normalize === 'function') {
    text = text.normalize('NFKD');
  }
  // Step 1, deliberately after step 2 (ACT removes parentheses first), so
  // characters that decompose to parentheses (full-width `（）`, `⑴`, `㈱`) are
  // removed along with their content.
  // @see https://github.com/dequelabs/axe-core/pull/5419#discussion_r4135949037
  text = removeParentheticals(text);
  // Step 3a. Emoji are non-text content, even when made of digits (keycaps).
  text = removeUnicode(text, { emoji: true, replaceWith: ' ' });
  // Step 3b. Anything that is not a letter or a number is a word separator.
  text = text.replace(NON_LETTER_OR_NUMBER, ' ');
  // Step 4
  return splitWords(sanitize(text));
}

// ICU seems to auto-detects dictionary languages regardless of locale, so we can
// use undefined for the locale
const WORD_SEGMENTER =
  typeof window.Intl?.Segmenter === 'function'
    ? new Intl.Segmenter(undefined, { granularity: 'word' })
    : null;

/**
 * Split `text` into words. Uses `Intl.Segmenter` with word granularity when
 * available so scripts written without spaces (Han, kana, Hangul, Thai, Lao,
 * Khmer, Burmese) are tokenized by the browser's ICU dictionary rather than
 * collapsed into a single token. Falls back to a whitespace split in
 * environments that don't support `Intl.Segmenter` (IE11, older browsers).
 *
 * @see https://github.com/dequelabs/axe-core/issues/5420
 *
 * @param {String} text sanitized text, letters/numbers/spaces only
 * @returns {String[]}
 */
function splitWords(text) {
  if (!WORD_SEGMENTER) {
    return text.split(/\s+/).filter(Boolean);
  }
  const words = [];
  for (const { segment } of WORD_SEGMENTER.segment(text)) {
    const trimmed = segment.trim();
    if (trimmed) {
      words.push(trimmed);
    }
  }
  return words;
}

/**
 * Whether `needle` appears as a contiguous run within `haystack`.
 *
 * @param {String[]} haystack
 * @param {String[]} needle
 * @returns {Boolean}
 */
function isContiguousSubsequence(haystack, needle) {
  for (let i = 0; i + needle.length <= haystack.length; i++) {
    if (needle.every((word, j) => word === haystack[i + j])) {
      return true;
    }
  }
  return false;
}

function labelContentNameMismatchEvaluate(node, options, virtualNode) {
  const pixelThreshold = options?.pixelThreshold;
  const occurrenceThreshold =
    options?.occurrenceThreshold ?? options?.occuranceThreshold;
  const accText = foldcase(accessibleText(node)).toLowerCase();
  const visibleText = foldcase(
    visibleVirtual(virtualNode, false, false, {
      ignoreIconLigature: true,
      pixelThreshold,
      occurrenceThreshold
    })
  ).toLowerCase();

  if (!visibleText) {
    return true;
  }

  if (
    isHumanInterpretable(accText) < 1 ||
    isHumanInterpretable(visibleText) < 1
  ) {
    return undefined;
  }

  if (isLabelContainedInName(visibleText, accText)) {
    return true;
  }

  // Some roles carry value text alongside their label, so their visible text is
  // not expected to be contained in the accessible name.
  const valueTextRoles = options?.valueTextRoles ?? [];
  if (valueTextRoles.includes(getRole(virtualNode))) {
    this.data({ messageKey: 'valueText' });
    return undefined;
  }

  return false;
}

export default labelContentNameMismatchEvaluate;
