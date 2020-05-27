import { lookupTable, getRole, validateAttr } from '../../commons/aria';
import matches from '../../commons/matches';
import { getNodeAttributes } from '../../core/utils';

function ariaUnsupportedAttrEvaluate(node) {
	const nodeName = node.nodeName.toUpperCase();
	const role = getRole(node);

	const unsupportedAttrs = Array.from(getNodeAttributes(node))
		.filter(({ name }) => {
			const attribute = lookupTable.attributes[name];

			if (!validateAttr(name)) {
				return false;
			}

			const { unsupported } = attribute;

			if (typeof unsupported !== 'object') {
				return !!unsupported;
			}

			// validate attributes and conditions (if any) from allowedElement to given node
			const isException = matches(node, unsupported.exceptions);

			if (!Object.keys(lookupTable.evaluateRoleForElement).includes(nodeName)) {
				return !isException;
			}

			// evaluate a given aria-role, execute the same
			return !lookupTable.evaluateRoleForElement[nodeName]({
				node,
				role,
				out: isException
			});
		})
		.map(candidate => candidate.name.toString());

	if (unsupportedAttrs.length) {
		this.data(unsupportedAttrs);
		return true;
	}
	return false;
}

export default ariaUnsupportedAttrEvaluate;
