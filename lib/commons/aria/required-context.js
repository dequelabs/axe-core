import lookupTable from './lookup-table';
import { clone } from '../../core/utils';

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
	let context = null;
	const roles = lookupTable.role[role];

	if (roles) {
		context = clone(roles.context);
	}
	return context;
}

export default requiredContext;
