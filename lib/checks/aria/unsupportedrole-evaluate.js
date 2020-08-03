import { isUnsupportedRole, getRole } from '../../commons/aria';

function unsupportedroleEvaluate(node) {
	return isUnsupportedRole(getRole(node));
}

export default unsupportedroleEvaluate;
