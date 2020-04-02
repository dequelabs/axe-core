import lookupTable from './lookup-table';

/**
 * Get a list of CSS selectors of nodes that have an implicit role
 * @method implicitNodes
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of CSS selectors or `null` if there are none
 */
function implicitNodes(role) {
	'use strict';

	let implicit = null;
	const roles = lookupTable.role[role];

	if (roles && roles.implicit) {
		// TODO: es-module-utils.clone
		implicit = axe.utils.clone(roles.implicit);
	}
	return implicit;
}

export default implicitNodes;
