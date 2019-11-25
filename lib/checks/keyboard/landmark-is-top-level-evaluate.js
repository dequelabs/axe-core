import { getRolesByType, implicitRole } from '../../commons/aria';
import { getComposedParent } from '../../commons/dom';

var landmarks = getRolesByType('landmark');

function landmarkIsTopLevelEvaluate(node, options, virtualNode, context) {
  var parent = getComposedParent(node);
  this.data({
  	role: node.getAttribute('role') || implicitRole(node)
  });

  while (parent) {
  	var role = parent.getAttribute('role');
  	if (!role && parent.nodeName.toUpperCase() !== 'FORM') {
  		role = implicitRole(parent);
  	}
  	if (role && landmarks.includes(role)) {
  		return false;
  	}
  	parent = getComposedParent(parent);
  }
  return true;
}

export default landmarkIsTopLevelEvaluate;