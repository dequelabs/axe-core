import { getRole } from '../../commons/aria';

function ariaRoledescriptionEvaluate(node, options = {}) {
	const role = getRole(node);
	const supportedRoles = options.supportedRoles || [];

	if (supportedRoles.includes(role)) {
		return true;
	}

	if (role && role !== 'presentation' && role !== 'none') {
		return undefined;
	}

	return false;
}

export default ariaRoledescriptionEvaluate;
