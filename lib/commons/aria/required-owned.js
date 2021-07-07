import lookupTable from './lookup-table';
import { clone } from '../../core/utils';

/**
 * Get the required owned (children) roles for a given role
 * @method requiredOwned
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of required owned elements or `null` if there are none
 */
function requiredOwned(role) {
	'use strict';
	let owned = null;
	const roles = lookupTable.role[role];

	if (roles) {
		owned = clone(roles.owned);
	}
	return owned;
}

export default requiredOwned;
