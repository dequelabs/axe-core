import { isValidRole, getRoleType, implicitRole } from '../../commons/aria';

function implicitRoleFallbackEvaluate(node) {
	const role = node.getAttribute('role');
	if (role === null || !isValidRole(role)) {
		return true;
	}
	const roleType = getRoleType(role);
	return implicitRole(node) === roleType;
}

export default implicitRoleFallbackEvaluate;
