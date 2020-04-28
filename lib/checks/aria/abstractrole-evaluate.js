import { tokenList } from '../../core/utils';
import { getRoleType } from '../../commons/aria';

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
