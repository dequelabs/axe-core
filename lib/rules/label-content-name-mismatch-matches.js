/**
 * Applicability:
 * Rule applies to any element that has
 * a) a semantic role that is `widget` that supports name from content
 * b) has visible text content
 * c) has accessible name (eg: `aria-label`)
 */
const { aria, text } = axe.commons;

const role = aria.getRole(node);
const widgetRoles = getWidgetRoles();
const rolesWithNameFromContents = aria.getRolesWithNameFromContents();
if (
	!role ||
	!widgetRoles.includes(role) ||
	!rolesWithNameFromContents.includes(role)
) {
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
 * Helper function to get all roles of type `widget`
 */
function getWidgetRoles() {
	const widgetRoles = [];

	axe.imports.ariaQuery.roles.forEach((roleValue, roleKey) => {
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
		if (roleTypes.includes(`widget`)) {
			widgetRoles.push(roleKey);
		}
	});

	return widgetRoles;
}
