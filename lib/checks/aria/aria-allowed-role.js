/**
 * Implements allowed roles defined at:
 * https://www.w3.org/TR/html-aria/#docconformance
 * https://www.w3.org/TR/SVG2/struct.html#implicit-aria-semantics
 */
const { allowImplicit = true, ignoredTags = [] } = options || {};
const tagName = node.tagName.toUpperCase();

// check if the element should be ignored, by an user setting
if (ignoredTags.map(t => t.toUpperCase()).includes(tagName)) {
	return true;
}

const unallowedRoles = axe.commons.aria.getAriaUnAllowedRoles(
	node,
	allowImplicit
);

if (unallowedRoles.length) {
	this.data(unallowedRoles.join(', '));
	return false;
}
return true;
