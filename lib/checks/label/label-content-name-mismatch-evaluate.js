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
 * within the accessible name. This implements the comparison at the core of ACT
 * rule 2ee8b8's "label in name" algorithm: tokenize on non-text characters, then
 * match whole words rather than raw substrings.
 *
 * Note: 2ee8b8's parenthetical-content removal and NFKD normalization steps are
 * not implemented (see https://github.com/dequelabs/axe-core/issues/5207).
 *
 * @param {String} label visible label text
 * @param {String} name accessible name
 * @param {Object} [options]
 * @param {Boolean} [options.joinNonText=false] remove non-text characters
 * instead of treating them as word separators, so a difference that is only
 * punctuation collapses away
 * @returns {Boolean}
 */
function isLabelContainedInName(label, name, { joinNonText = false } = {}) {
  const labelTokens = curateTokens(label, joinNonText);
  const nameTokens = curateTokens(name, joinNonText);
  if (!labelTokens.length || !nameTokens.length) {
    return false;
  }
  return isContiguousSubsequence(nameTokens, labelTokens);
}

/**
 * Split text into words. Non-text characters (emoji, punctuation, symbols) are
 * word separators by default (replaced with a space); when `joinNonText` is set
 * they are removed instead, so a punctuation-only difference collapses away.
 * Uses `removeUnicode`'s explicit unicode ranges (rather than a `\p{…}` property
 * escape) to keep working on the browsers axe supports.
 *
 * @param {String} str given text to tokenize
 * @param {Boolean} [joinNonText=false] remove non-text characters instead of
 * replacing them with a space
 * @returns {String[]}
 */
function curateTokens(str, joinNonText = false) {
  // Zero-width format characters are invisible, so they can't be word
  // boundaries; strip them before handling other non-text characters (otherwise
  // a soft hyphen or zero-width space would split a word).
  const separated = removeUnicode(str.replace(getCategoryFormatRegExp(), ''), {
    emoji: true,
    nonBmp: true,
    punctuations: true,
    replaceWith: joinNonText ? '' : ' '
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

  // ACT rule 2ee8b8 treats punctuation-only differences (e.g. hyphenation) as
  // inapplicable. When the label is contained in the name once non-text
  // characters are removed rather than treated as word separators, the only
  // difference is punctuation, so return undefined (needs review) instead of a
  // violation.
  //
  // TODO(#5203): the incomplete result here is load-bearing only while the
  // pinned wcag-act-rules dep is stale. When the dep bump tracks `main`,
  // revisit whether these should stay incomplete or stop matching the rule.
  if (isLabelContainedInName(visibleText, accText, { joinNonText: true })) {
    this.data({ messageKey: 'punctuation' });
    return undefined;
  }

  return false;
}

export default labelContentNameMismatchEvaluate;
