import { isValidRole } from '../../commons/aria';
import { tokenList } from '../../core/utils';

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
