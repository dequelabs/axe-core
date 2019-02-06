const { text } = axe.commons;

const accText = text.sanitize(text.accessibleText(node)).toLowerCase();
if (text.isHumanInterpretable(accText) <= 0) {
	return undefined;
}

const visibleText = text
	.sanitize(text.visibleVirtual(virtualNode))
	.toLowerCase();
if (text.isHumanInterpretable(visibleText) <= 0) {
	if (isStringContained(visibleText, accText)) {
		return true;
	}
	return undefined;
}

return isStringContained(visibleText, accText);

/**
 * Check if a given text exists in another
 *
 * @param {String} compare given text to check
 * @param {String} compareWith text against which to be compared
 * @returns {Boolean}
 */
function isStringContained(compare, compareWith) {
	const curatedCompareWith = curateString(compareWith);
	const curatedCompare = curateString(compare);
	if (!curatedCompareWith || !curatedCompare) {
		return false;
	}
	return curatedCompareWith.includes(curatedCompare);
}

/**
 * Curate given text, by removing emoji's, punctuations, unicode and trimming.
 *
 * @param {String} str given text to curate
 * @returns {String}
 */
function curateString(str) {
	return text.sanitize(
		text.replacePunctuation(
			text.replaceNonBmpUnicode(text.replaceEmojiUnicode(str))
		)
	);
}
