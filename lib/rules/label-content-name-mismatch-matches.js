/**
 * Applicability:
 * Rule applies to any element that has
 * a) a semantic role that is `widget` that supports name from content
 * b) has visible text content
 * c) has an accessible name (eg: `aria-label`)
 */
const {
	aria: {
		arialabelText,
		arialabelledbyText,
		getRole,
		getRolesWithNameFromContents
	},
	text: {
		accessibleText,
		visible: visibleText // -> get visible text
	}
} = axe.commons;

const role = getRole(node);
/**
 * if no `role` - ignore `node`
 */
if (!role) {
	return false;
}

const rolesWithNameFromContents = getRolesWithNameFromContents();
/**
 * if no `rolesWithNameFromContents` - ignore `node`
 */
if (!rolesWithNameFromContents) {
	return false;
}

/**
 * if no `aria-label` or `aria-labelledby` attribute - ignore `node`
 */
const isAriaLabel = arialabelText(node);
const isAriaLabelledBy = arialabelledbyText(node);
if (!isAriaLabel && !isAriaLabelledBy) {
	return false;
}

const visibleTextContent = visibleText(node);
/**
 * if no `contentText` or contains `unicode` - ignore `node`
 */
if (!visibleTextContent || /[^\u0000-\u00ff]/.test(visibleTextContent)) {
	return false;
}

const accText = accessibleText(node);
/**
 * if no `accessibleText` or contains `unicode` - ignore `node`
 */
if (!accText || /[^\u0000-\u00ff]/.test(accText)) {
	return false;
}

return true;
