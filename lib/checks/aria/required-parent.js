const { aria } = axe.commons;

const role = aria.getRole(virtualNode);
const requiredContext = aria.requiredContext(role);
if (!requiredContext) {
	return true;
}

const owner = aria.getOwnerVirtual(virtualNode);
if (!owner) {
	return undefined;
}
if (hasRequiredContextRole(owner, requiredContext)) {
	return true;
}

this.relatedNodes(owner);
this.data(requiredContext);
return false;

/**
 * Verify if a given element or its parent (recursively) has any of the required context roles
 * @param {HTMLElement} elm element
 * @param {String[]} contextRoles list of context roles
 * @returns {Boolean}
 */
function hasRequiredContextRole(elm, contextRoles) {
	if (!elm) {
		return false;
	}

	const role = aria.getRole(elm);
	if (['presentation', 'none', null].includes(aria.getRole(elm))) {
		return hasRequiredContextRole(elm.parentNode, contextRoles);
	}
	if (!contextRoles.includes(role)) {
		return false;
	}

	return true;
}
