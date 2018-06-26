/**
 * Implements allowed roles defined at:
 * https://www.w3.org/TR/html-aria/#docconformance
 * https://www.w3.org/TR/SVG2/struct.html#implicit-aria-semantics
 */
const { allowImplicit = true, ignoredTags = [] } = options || {};

const tagName = node.tagName.toLowerCase();

// check if the element should be ignored, by an user setting
if (ignoredTags && ignoredTags.indexOf(tagName) > -1) {
	return true;
}

const roleSegments = axe.commons.aria.getRoleSegments(node);
const implicitRole = axe.commons.aria.implicitRole(node);


// stores all roles that are not allowed for an specific element, most often an element only as one explicit role
const disallowedRoles = roleSegments.reduce((out, role) => {
	// check if an implicit role may be set explicit following a setting
	if (!allowImplicit &&
		role === implicitRole) {
		// edge case: setting implicit role row on tr element is allowed when child of table[role='grid']
		if (!(role === 'row' &&
			tagName === 'tr' &&
			axe.commons.utils.matchesSelector('table[role="grid"] :scope'))) {
			out.push(role);
		}
	}

	const	allowed = axe.commons.aria.isAllowedRole(node, tagName, role);

	if (!allowed) {
		out.push(role);
	}

	return out;
}, []);

if (disallowedRoles.length) {
	return false;
}

return true;
