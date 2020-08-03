import { implicitRole } from '../../commons/aria';
import { getAriaRolesByType } from '../../commons/standards';
import { getComposedParent } from '../../commons/dom';

function landmarkIsTopLevelEvaluate(node) {
	var landmarks = getAriaRolesByType('landmark');
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
