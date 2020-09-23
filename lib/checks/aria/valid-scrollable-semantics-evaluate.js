/**
 * A map from HTML tag names to a boolean which reflects whether it is
 * appropriate for scrollable elements found in the focus order.
 */
const VALID_TAG_NAMES_FOR_SCROLLABLE_REGIONS = {
	ARTICLE: true,
	ASIDE: true,
	NAV: true,
	SECTION: true
};

/**
 * A map from each landmark role to a boolean which reflects whether it is
 * appropriate for scrollable elements found in the focus order.
 */
const VALID_ROLES_FOR_SCROLLABLE_REGIONS = {
	application: true,
	banner: false,
	complementary: true,
	contentinfo: true,
	form: true,
	main: true,
	navigation: true,
	region: true,
	search: false
};

/**
 * @param {HTMLElement} node
 * @return {Boolean} Whether the element has a tag appropriate for a scrollable
 *		 region.
 */
function validScrollableTagName(node) {
	// Some elements with nonsensical roles will pass this check, but should be
	// flagged by other checks.
	const nodeName = node.nodeName.toUpperCase();
	return VALID_TAG_NAMES_FOR_SCROLLABLE_REGIONS[nodeName] || false;
}

/**
 * @param {HTMLElement} node
 * @return {Boolean} Whether the node has a role appropriate for a scrollable
 *		 region.
 */
function validScrollableRole(node) {
	var role = node.getAttribute('role');
	if (!role) {
		return false;
	}
	return VALID_ROLES_FOR_SCROLLABLE_REGIONS[role.toLowerCase()] || false;
}

/**
 * Check if the element has a valid scrollable role or tag.
 *
 * @memberof checks
 * @param {HTMLElement} node
 * @return {Boolean} True if the elements role or tag name is a valid scrollable region. False otherwise.
 */
function validScrollableSemanticsEvaluate(node) {
	return validScrollableRole(node) || validScrollableTagName(node);
}

export default validScrollableSemanticsEvaluate;
