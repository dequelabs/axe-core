/**
 * Applicability:
 * Rule applies to any element that has
 * a) a semantic role that is `widget` that supports name from content
 * b) has visible text content
 * c) has accessible name (eg: `aria-label`)
 */
const { aria, text } = axe.commons;

const role = aria.getRole(node);
if (!role) {
	return false;
}

const isWidgetType = aria.lookupTable.rolesOfType.widget.includes(role);
if (!isWidgetType) {
	return false;
}

const rolesWithNameFromContents = aria.getRolesWithNameFromContents();
if (!rolesWithNameFromContents.includes(role)) {
	return false;
}

/**
 * if no `aria-label` or `aria-labelledby` attribute - ignore `node`
 */
if (
	!text.sanitize(aria.arialabelText(node)) &&
	!text.sanitize(aria.arialabelledbyText(node))
) {
	return false;
}

/**
 * if no `contentText` - ignore `node`
 */
if (!text.sanitize(text.visibleVirtual(virtualNode))) {
	return false;
}

return true;
