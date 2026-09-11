import {
  accessibleText,
  isHumanInterpretable,
  removeUnicode,
  sanitize,
  visibleVirtual
} from '../../commons/text';
import { getCategoryFormatRegExp } from '../../commons/text/unicode';

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
 * Split text into words, treating non-text characters (emoji, punctuation,
 * symbols) as word separators. Uses `removeUnicode`'s explicit unicode ranges
 * (rather than a `\p{…}` property escape) to keep working on the browsers axe
 * supports.
 *
 * @param {String} str given text to tokenize
 * @returns {String[]}
 */
function curateTokens(str) {
  // Zero-width format characters are invisible, so they can't be word
  // boundaries; strip them before handling other non-text characters (otherwise
  // a soft hyphen or zero-width space would split a word).
  const separated = removeUnicode(
    removeParentheticals(str).replace(getCategoryFormatRegExp(), ''),
    {
      emoji: true,
      nonBmp: true,
      punctuations: true,
      replaceWith: ' '
    }
  );
  return sanitize(separated).split(/\s+/).filter(Boolean);
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

  return isLabelContainedInName(visibleText, accText);
}

export default labelContentNameMismatchEvaluate;
