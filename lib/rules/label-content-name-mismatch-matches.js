/**
 * Applicability:
 * This rule applies to any element that has:
 * - a semantic role that is a widget that supports name from content, and
 * - visible text content, and
 * - an aria-label or aria-labelledby attribute.
 */
const { aria } = axe.commons;
const role = aria.getRole(node, { noImplicit: false, fallback: true });

// no role - exclude
if (!role) {
	return false;
}

const rolesWithNameFromContents = aria.getRolesWithNameFromContents();

// if role is not one of roles with name from contents - exclude
if (!rolesWithNameFromContents.includes(role)) {
	return false;
}

// if no accessible name attributes - exclude
if (!node.getAttribute('aria-labelledby') && !node.getAttribute('aria-label')) {
	return false;
}

// if no text content - exclude
if (node.textContent.toLowerCase().trim().length <= 0) {
	return false;
}

return true;
