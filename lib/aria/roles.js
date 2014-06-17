/*global aria, lookupTables, utils */

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
		owned = utils.clone(roles.owned);
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
		context = utils.clone(roles.context);
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
		implicit = utils.clone(roles.implicit);
	}
	return implicit;
};