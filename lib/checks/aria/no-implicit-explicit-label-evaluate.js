import { getRole } from '../../commons/aria';
import { sanitize, labelText, accessibleText } from '../../commons/text';

function noImplicitExplicitLabelEvaluate(node, options, virtualNode) {
	const role = getRole(node, { noImplicit: true });
	this.data(role);

	const label = sanitize(labelText(virtualNode)).toLowerCase();
	const accText = sanitize(accessibleText(node)).toLowerCase();

	if (!accText && !label) {
		return false;
	}

	if (!accText && label) {
		return undefined;
	}

	if (!accText.includes(label)) {
		return undefined;
	}

	return false;
}

export default noImplicitExplicitLabelEvaluate;
