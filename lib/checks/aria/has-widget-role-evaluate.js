import { getRoleType } from '../../commons/aria';

function hasWidgetRoleEvaluate(node) {
	const role = node.getAttribute('role');
	if (role === null) {
		return false;
	}
	const roleType = getRoleType(role);
	return roleType === 'widget' || roleType === 'composite';
}

export default hasWidgetRoleEvaluate;
