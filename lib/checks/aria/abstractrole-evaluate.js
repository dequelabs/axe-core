import { tokenList } from '../../core/utils';
import { getRoleType } from '../../commons/aria';

/**
 * Check if an element's `role` attribute uses any abstract role values.
 *
 * Abstract roles are taken from the `ariaRoles` standards object from the roles `type` property.
 *
 * @data {String[]} List of all abstract role.
 * @return {Boolean} True if the element uses an `abstract` role. False otherwise.
 */
function abstractroleEvaluate(node, options, virtualNode) {
	const abstractRoles = tokenList(virtualNode.attr('role')).filter(
		role => getRoleType(role) === 'abstract'
	);

	if (abstractRoles.length > 0) {
		this.data(abstractRoles);
		return true;
	}

	return false;
}

export default abstractroleEvaluate;
