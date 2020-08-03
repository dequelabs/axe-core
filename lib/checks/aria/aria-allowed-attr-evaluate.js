import { getNodeAttributes, uniqueArray } from '../../core/utils';
import { getRole, allowedAttr, validateAttr } from '../../commons/aria';

function ariaAllowedAttrEvaluate(node, options) {
	const invalid = [];

	const role = getRole(node);
	const attrs = getNodeAttributes(node);
	let allowed = allowedAttr(role);

	// @deprecated: allowed attr options to pass more attrs.
	// configure the standards spec instead
	if (Array.isArray(options[role])) {
		allowed = uniqueArray(options[role].concat(allowed));
	}

	if (role && allowed) {
		for (let i = 0; i < attrs.length; i++) {
			const attr = attrs[i];
			const attrName = attr.name;
			if (validateAttr(attrName) && !allowed.includes(attrName)) {
				invalid.push(attrName + '="' + attr.nodeValue + '"');
			}
		}
	}

	if (invalid.length) {
		this.data(invalid);
		return false;
	}

	return true;
}

export default ariaAllowedAttrEvaluate;
