import {
  accessibleText,
  isHumanInterpretable,
  removeUnicode,
  sanitize,
  visibleVirtual
} from '../../commons/text';
import { getRole } from '../../commons/aria';

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
  const accText = accessibleText(node).toLowerCase();
  const visibleText = visibleVirtual(virtualNode, false, false, {
    ignoreIconLigature: true,
    pixelThreshold,
    occurrenceThreshold
  }).toLowerCase();

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
