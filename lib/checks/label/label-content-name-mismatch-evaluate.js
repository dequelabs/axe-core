import {
  accessibleText,
  isHumanInterpretable,
  removeUnicode,
  sanitize,
  visibleVirtual
} from '../../commons/text';

/**
 * Check whether the words of `compare` appear as a contiguous run of words
 * within `compareWith`, following ACT rule 2ee8b8's "label in name" algorithm:
 * non-letter/non-digit characters are treated as word separators and the
 * comparison is done on whole words, not raw substrings.
 *
 * @param {String} compare given text to check
 * @param {String} compareWith text against which to be compared
 * @returns {Boolean}
 */
function isStringContained(compare, compareWith) {
  const compareTokens = curateTokens(compare);
  const compareWithTokens = curateTokens(compareWith);
  if (!compareTokens.length || !compareWithTokens.length) {
    return false;
  }
  return isContiguousSubsequence(compareWithTokens, compareTokens);
}

/**
 * Tokenize text the way ACT rule 2ee8b8's "label in name" algorithm does:
 * treat non-text characters (emoji, punctuation, symbols) as word separators
 * by replacing them with a space, then split into words. Uses `removeUnicode`'s
 * explicit unicode ranges (rather than a `\p{…}` property escape) to keep the
 * comparison working on the browsers axe supports.
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
  return sanitize(separated).split(' ').filter(Boolean);
}

/**
 * Whether `sub` appears as a contiguous run within `sequence`.
 *
 * @param {String[]} sequence
 * @param {String[]} sub
 * @returns {Boolean}
 */
function isContiguousSubsequence(sequence, sub) {
  for (let i = 0; i + sub.length <= sequence.length; i++) {
    if (sub.every((word, j) => word === sequence[i + j])) {
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

  return isStringContained(visibleText, accText);
}

export default labelContentNameMismatchEvaluate;
