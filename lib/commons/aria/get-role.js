import isValidRole from './is-valid-role';
import implicitRole from './implicit-role';
import { tokenList } from '../../core/utils';

/**
 * Return the accessible role of an element
 *
 * @method getRole
 * @memberof axe.commons.aria
 * @instance
 * @param {Element} node
 * @param {Object} options
 * @param {boolean} options.noImplicit  Do not return the implicit role
 * @param {boolean} options.fallback  Allow fallback roles
 * @param {boolean} options.abstracts  Allow role to be abstract
 * @param {boolean} options.dpub  Allow role to be any (valid) doc-* roles
 * @returns {string|null} Role or null
 */
function getRole(node, { noImplicit, fallback, abstracts, dpub } = {}) {
	node = node.actualNode || node;
	if (node.nodeType !== 1) {
		return null;
	}
	const roleAttr = (node.getAttribute('role') || '').trim().toLowerCase();
	const roleList = fallback ? tokenList(roleAttr) : [roleAttr];

	// Get the first valid role:
	const validRoles = roleList.filter(role => {
		if (!dpub && role.substr(0, 4) === 'doc-') {
			return false;
		}
		return isValidRole(role, { allowAbstract: abstracts });
	});

	const explicitRole = validRoles[0];

	// Get the implicit role, if permitted
	if (!explicitRole && !noImplicit) {
		return implicitRole(node);
	}

	return explicitRole || null;
}

export default getRole;
