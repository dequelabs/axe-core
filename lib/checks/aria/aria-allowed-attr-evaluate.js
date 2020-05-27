import { getNodeAttributes, uniqueArray } from '../../core/utils';
import { implicitRole, allowedAttr, validateAttr } from '../../commons/aria';

function ariaAllowedAttrEvaluate(node, options = {}) {
	var invalid = [];

	var attr,
		attrName,
		allowed,
		role = node.getAttribute('role'),
		attrs = getNodeAttributes(node);

	if (!role) {
		role = implicitRole(node);
	}

	allowed = allowedAttr(role);

	if (Array.isArray(options[role])) {
		allowed = uniqueArray(options[role].concat(allowed));
	}

	if (role && allowed) {
		for (var i = 0, l = attrs.length; i < l; i++) {
			attr = attrs[i];
			attrName = attr.name;
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
