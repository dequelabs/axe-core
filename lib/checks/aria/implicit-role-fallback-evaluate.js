import {
  isValidRole,
  getRoleType,
  implicitRole
} from '../../commons/aria';

function implicitRoleFallbackEvaluate(node, options, virtualNode, context) {
  var role = node.getAttribute('role');
  if (role === null || !isValidRole(role)) {
  	return true;
  }
  var roleType = getRoleType(role);
  return implicitRole(node) === roleType;
}

export default implicitRoleFallbackEvaluate;