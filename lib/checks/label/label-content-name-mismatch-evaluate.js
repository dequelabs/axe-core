import {
  accessibleText,
  isHumanInterpretable,
  removeUnicode,
  sanitize,
  visibleVirtual
} from '../../commons/text';

/**
 * Check whether the visible label's words appear as a contiguous run of words
 * within the accessible name. This implements the comparison at the core of ACT
 * rule 2ee8b8's "label in name" algorithm: tokenize on non-text characters, then
 * match whole words rather than raw substrings.
 *
 * Note: 2ee8b8's parenthetical-content removal and NFKD normalization steps are
 * not implemented (see https://github.com/dequelabs/axe-core/issues/5207).
 *
 * @param {String} label visible label text
 * @param {String} name accessible name
 * @returns {Boolean}
 */
function isLabelContainedInName(label, name) {
  const labelTokens = curateTokens(label);
  const nameTokens = curateTokens(name);
  if (!labelTokens.length || !nameTokens.length) {
    return false;
  }
  return isContiguousSubsequence(nameTokens, labelTokens);
}

/**
 * Split text into words, treating non-text characters (emoji, punctuation,
 * symbols) as separators by replacing them with a space. Uses `removeUnicode`'s
 * explicit unicode ranges (rather than a `\p{…}` property escape) to keep
 * working on the browsers axe supports.
 *
 * @param {String} str given text to tokenize
 * @returns {String[]}
 */
function curateTokens(str) {
  const separated = removeUnicode(str, {
    emoji: true,
    nonBmp: true,
    punctuations: true,
    replaceWith: ' '
  });
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

/**
 * Remove hyphens so a hyphenated word collapses into a single word (e.g.
 * "non-standard" becomes "nonstandard"). Used to detect when the only
 * difference between the label and the name is hyphenation.
 *
 * @param {String} str
 * @returns {String}
 */
function removeHyphens(str) {
  return str.replace(/[-‐‑]/g, '');
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

  // ACT rule 2ee8b8 treats hyphenation differences as inapplicable. When the
  // label is contained in the name once hyphens are removed rather than treated
  // as word separators, the only difference is hyphenation, so return undefined
  // (needs review) instead of a violation.
  if (
    isLabelContainedInName(removeHyphens(visibleText), removeHyphens(accText))
  ) {
    return undefined;
  }

  return false;
}

export default labelContentNameMismatchEvaluate;
