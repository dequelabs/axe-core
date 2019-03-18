/* global context */
/**
 * get CSSOM
 */
const { cssom = undefined } = context || {};

/**
 * If no CSSOM
 * -> flag as NEEDS REVIEW
 */
if (!cssom || !cssom.length) {
	return undefined;
}

const cssSpacingProperties = ['line-height', 'letter-spacing', 'word-spacing'];
/**
 * Iterate CSSOM
 * -> check if any `!important` overrides exist for above properties
 */
const hasInLineSpacingOverride = cssom.some(({ sheet }) => {
	const rules = Array.from(sheet.cssRules);
	if (!rules || !rules.length) {
		return false;
	}

	const spacingRules = getRulesWithSpacingProperties(rules);
	if (!spacingRules || !spacingRules.length) {
		return false;
	}

	return hasSpacingOverride(spacingRules);
});

/**
 * If no inline spacing override -> PASS
 */
if (!hasInLineSpacingOverride) {
	return true;
}

/**
 * -> FAIL
 */
return false;

// TODO: jsdocs
function getRulesWithSpacingProperties(rules) {
	return rules.filter(({ style }) => {
		if (!style || !style.length) {
			return false;
		}
		return hasSpacingCssRule(style);
	});
}

// TODO: jsdocs
function hasSpacingCssRule(style) {
	return (
		Array.from(style).filter(property =>
			cssSpacingProperties.includes(property)
		).length > 0
	);
}

// TODO: jsdocs
function hasSpacingOverride(rules) {
	return rules.some(rule => {
		if (hasOverrideOfImportant(rule)) {
			return true;
		}

		/**
		 * TODO:
		 * https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing#Accessibility_concerns
		 * https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing#Accessibility_concerns
		 * https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#Accessibility_concerns
		 */
		return false;
	});
}

// TODO: jsdocs
function hasOverrideOfImportant(rule) {
	const { style, cssText } = rule;
	return cssSpacingProperties.some(property => {
		const value = style[property];
		if (!value) {
			return false;
		}
		return cssText.includes(`${property}: ${value} !important`);
	});
}
