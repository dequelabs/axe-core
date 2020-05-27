import { validateAttr } from '../../commons/aria';
import { getNodeAttributes } from '../../core/utils';

function ariaValidAttrEvaluate(node, options) {
	options = Array.isArray(options.value) ? options.value : [];

	var invalid = [],
		aria = /^aria-/;

	var attr,
		attrs = getNodeAttributes(node);

	for (var i = 0, l = attrs.length; i < l; i++) {
		attr = attrs[i].name;
		if (
			options.indexOf(attr) === -1 &&
			aria.test(attr) &&
			!validateAttr(attr)
		) {
			invalid.push(attr);
		}
	}

	if (invalid.length) {
		this.data(invalid);
		return false;
	}

	return true;
}

export default ariaValidAttrEvaluate;
