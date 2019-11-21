import lookupTable from './lookup-table';

/**
 * Get the roles that get name from the element's contents
 * @method getRolesWithNameFromContents
 * @memberof axe.commons.aria
 * @instance
 * @return {Array} Array of roles that match the type
 */
function getRolesWithNameFromContents() {
	return Object.keys(lookupTable.role).filter(function(r) {
		return (
			lookupTable.role[r].nameFrom &&
			lookupTable.role[r].nameFrom.indexOf('contents') !== -1
		);
	});
}

export default getRolesWithNameFromContents;
