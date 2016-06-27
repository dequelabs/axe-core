/*global aria, lookupTables, axe */

/**
 * Check if a given role is valid
 * @param  {String}  role The role to check
 * @return {Boolean}
 */
aria.isValidRole = function (role) {
	'use strict';
	if (lookupTables.role[role]) {
		return true;
	}

	return false;
};

/**
 * Get the roles that get name from contents
 * @return {Array}           Array of roles that match the type
 */
aria.getRolesWithNameFromContents = function () {
	return Object.keys(lookupTables.role).filter(function (r) {
		return lookupTables.role[r].nameFrom &&
			lookupTables.role[r].nameFrom.indexOf('contents') !== -1;
	});
};

/**
 * Get the roles that have a certain "type"
 * @param  {String} roleType The roletype to check
 * @return {Array}           Array of roles that match the type
 */
aria.getRolesByType = function (roleType) {
	return Object.keys(lookupTables.role).filter(function (r) {
		return lookupTables.role[r].type === roleType;
	});
};

/**
 * Get the "type" of role; either widget, composite, abstract, landmark or `null`
 * @param  {String} role The role to check
 * @return {Mixed}       String if a matching role and its type are found, otherwise `null`
 */
aria.getRoleType = function (role) {
	var r = lookupTables.role[role];

	return (r && r.type) || null;
};

/**
 * Get the required owned (children) roles for a given role
 * @param  {String} role The role to check
 * @return {Mixed}       Either an Array of required owned elements or `null` if there are none
 */
aria.requiredOwned = function (role) {
	'use strict';
	var owned = null,
		roles = lookupTables.role[role];

	if (roles) {
		owned = axe.utils.clone(roles.owned);
	}
	return owned;
};

/**
 * Get the required context (parent) roles for a given role
 * @param  {String} role The role to check
 * @return {Mixed}       Either an Array of required context elements or `null` if there are none
 */
aria.requiredContext = function (role) {
	'use strict';
	var context = null,
		roles = lookupTables.role[role];

	if (roles) {
		context = axe.utils.clone(roles.context);
	}
	return context;
};

/**
 * Get a list of CSS selectors of nodes that have an implicit role
 * @param  {String} role The role to check
 * @return {Mixed}       Either an Array of CSS selectors or `null` if there are none
 */
aria.implicitNodes = function (role) {
	'use strict';

	var implicit = null,
		roles = lookupTables.role[role];

	if (roles && roles.implicit) {
		implicit = axe.utils.clone(roles.implicit);
	}
	return implicit;
};

/**
 * Get the implicit role for a given node
 * @param  {HTMLElement} node The node to test
 * @return {Mixed}      Either the role or `null` if there is none
 */
aria.implicitRole = function (node) {
	'use strict';

	var role, r, candidate,
		roles = lookupTables.role;

	for (role in roles) {
		if (roles.hasOwnProperty(role)) {
			r = roles[role];
			if (r.implicit) {
				for (var index = 0, length = r.implicit.length; index < length; index++) {
					candidate = r.implicit[index];
					if (axe.utils.matchesSelector(node, candidate)) {
						return role;
					}
				}
			}
		}
	}

	return null;
};
