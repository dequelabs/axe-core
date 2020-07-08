import { getRole } from '../../commons/aria';
import { sanitize, labelText, accessibleTextVirtual } from '../../commons/text';

function noImplicitExplicitLabelEvaluate(node, options, virtualNode) {
	const role = getRole(virtualNode, { noImplicit: true });
	this.data(role);

	try {
		const label = sanitize(labelText(virtualNode)).toLowerCase();
		const accText = sanitize(accessibleTextVirtual(virtualNode)).toLowerCase();

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
	} catch (e) {
		return undefined;
	}
}

export default noImplicitExplicitLabelEvaluate;
