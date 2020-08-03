import { requiredAttr } from '../../commons/aria';
import { getElementSpec } from '../../commons/standards';
import { uniqueArray, getNodeFromTree } from '../../core/utils';

function ariaRequiredAttrEvaluate(node, options = {}) {
	const vNode = getNodeFromTree(node);
	const missing = [];

	if (node.hasAttributes()) {
		const role = node.getAttribute('role');
		let required = requiredAttr(role);
		const elmSpec = getElementSpec(vNode);

		// @deprecated: required attr options to pass more attrs.
		// configure the standards spec instead
		if (Array.isArray(options[role])) {
			required = uniqueArray(options[role], required);
		}
		if (role && required) {
			for (let i = 0, l = required.length; i < l; i++) {
				const attr = required[i];
				if (
					!node.getAttribute(attr) &&
					!(
						elmSpec.implicitAttrs &&
						typeof elmSpec.implicitAttrs[attr] !== 'undefined'
					)
				) {
					missing.push(attr);
				}
			}
		}
	}

	if (missing.length) {
		this.data(missing);
		return false;
	}

	return true;
}

export default ariaRequiredAttrEvaluate;
