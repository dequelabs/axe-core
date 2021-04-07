import { getRole, getRoleType } from '../../commons/aria';
import { accessibleTextVirtual } from '../../commons/text';
import { getAriaRolesByType } from '../../commons/standards';

function landmarkIsUniqueEvaluate(node, options, virtualNode) {
	var role = getRole(node, { dpub: true }); // fallback: true
	if (!role) {
		// this.data({ role: '', accessibleText: '', isLandmark: null });
		// console.log('landmarkIsUniqueEvaluate landmarkIsUniqueEvaluate landmarkIsUniqueEvaluate NO ROLE???!!!');
		return false;
	}

	var landmarks = getAriaRolesByType('landmark');
	var roleType = getRoleType(role);
	var isLandmark =
		roleType === 'landmark' ||
		landmarks.includes(roleType) ||
		landmarks.includes(role);

	// if (!isLandmark) {
	// 	// this.data({ role: '', accessibleText: '', isLandmark: null });
	// 	return false;
	// }
	// throw new Error('BREAK');

	var accessibleText = accessibleTextVirtual(virtualNode);

	// console.log('\n\n', virtualNode.props ? virtualNode.props.nodeName : '!virtualNode.props', role, roleType, JSON.stringify(landmarks), isLandmark, " [[" + accessibleText + "]]")

	accessibleText = accessibleText ? accessibleText.toLowerCase() : null;
	this.data({
		role: role,
		accessibleText: accessibleText,
		isLandmark: isLandmark
	});
	this.relatedNodes([node]);

	return true;
}

export default landmarkIsUniqueEvaluate;
