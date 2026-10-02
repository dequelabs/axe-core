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
const LETTER_OR_NUMBER = /[\p{L}\p{N}]/u;

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
  // Step 4. Word segmentation rules for the language of the text. A segmenter
  // with no locale still dictionary-breaks Han, kana and Thai. Whitespace is
  // the fallback where Intl.Segmenter does not exist. See #5420.
  return segmentWords(sanitize(text));
}

/**
 * Split text into words. Uses `Intl.Segmenter` when the runtime has it, and
 * whitespace otherwise.
 *
 * The locale is omitted on purpose: dictionary breaking does not need the
 * element's `lang`, and a missing constructor is the feature detect.
 *
 * @param {String} text
 * @returns {String[]}
 */
function segmentWords(text) {
  const Segmenter = typeof Intl !== 'undefined' ? Intl.Segmenter : undefined;
  if (typeof Segmenter !== 'function') {
    return text.split(/\s+/).filter(Boolean);
  }

  try {
    const segmenter = new Segmenter(undefined, { granularity: 'word' });
    const words = [];
    for (const part of segmenter.segment(text)) {
      // isWordLike misses numbers outside the ASCII digits, such as ⓫. Those
      // are still words for this check.
      if (part.isWordLike || LETTER_OR_NUMBER.test(part.segment)) {
        words.push(part.segment);
      }
    }
    return words;
  } catch {
    return text.split(/\s+/).filter(Boolean);
  }
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
