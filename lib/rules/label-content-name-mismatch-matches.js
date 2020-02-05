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

if (!isRoleOfType(role, `widget`)) {
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
	!text.sanitize(aria.arialabelText(virtualNode)) &&
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

/**
 * Helper to check of a given role is of a specified type
 *
 * @param {String} role aria role
 * @returns {Boolean}
 */
function isRoleOfType(role, type) {
	const roleValue = axe.imports.ariaQuery.roles.get(role);
	if (!roleValue) {
		return false;
	}

	/**
	 * Note: interface of superClass
	 * superClass: Array<Array<ARIAAbstractRole | ARIARole | ARIADPubRole>>;
	 *
	 * -> Flattening all superClass roles types
	 */
	const roleTypes = roleValue.superClass.reduce(
		(out, arrItem) => out.concat(arrItem),
		[]
	);
	if (!roleTypes.includes(type)) {
		return false;
	}

	return true;
}
