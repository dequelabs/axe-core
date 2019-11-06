import lookupTable from './lookup-table.js';
import { clone } from '../../core/utils/index.js';

/**
 * Get the required context (parent) roles for a given role
 * @method requiredContext
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of required context elements or `null` if there are none
 */
function requiredContext(role) {
	'use strict';
	var context = null,
		roles = lookupTable.role[role];

	if (roles) {
		context = clone(roles.context);
	}
	return context;
}

export default requiredContext;
