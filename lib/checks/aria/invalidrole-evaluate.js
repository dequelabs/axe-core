import { isValidRole } from '../../commons/aria';
import { tokenList } from '../../core/utils';

/**
 * Check that each role on an element is a valid ARIA role.
 *
 * Valid ARIA roles are listed in the `ariaRoles` standards object.
 *
 * @data {String[]} List of all invalid roles.
 * @return {Boolean} True if the element uses an invalid role. False otherwise.
 */
function invalidroleEvaluate(node, options, virtualNode) {
	const allRoles = tokenList(virtualNode.attr('role'));
	const allInvalid = allRoles.every(
		role => !isValidRole(role, { allowAbstract: true })
	);

	/**
	 * Only fail when all the roles are invalid
	 */
	if (allInvalid) {
		this.data(allRoles);
		return true;
	}

	return false;
}

export default invalidroleEvaluate;
