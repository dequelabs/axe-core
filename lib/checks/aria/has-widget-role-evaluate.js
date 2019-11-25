import { getRoleType } from '../../commons/aria';

function hasWidgetRoleEvaluate(node, options, virtualNode, context) {
  var role = node.getAttribute('role');
  if (role === null) {
  	return false;
  }
  var roleType = getRoleType(role);
  return roleType === 'widget' || roleType === 'composite';
}

export default hasWidgetRoleEvaluate;