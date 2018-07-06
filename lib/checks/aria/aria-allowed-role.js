/**
 * Implements allowed roles defined at:
 * https://www.w3.org/TR/html-aria/#docconformance
 * https://www.w3.org/TR/SVG2/struct.html#implicit-aria-semantics
 */
const { allowImplicit = true, ignoredTags = [] } = options || {};
const tagName = node.tagName.toLowerCase();

// check if the element should be ignored, by an user setting
if (ignoredTags && ignoredTags.includes(tagName)) {
	return true;
}

return axe.commons.aria.isAriaAllowedRole(node, tagName, allowImplicit);
