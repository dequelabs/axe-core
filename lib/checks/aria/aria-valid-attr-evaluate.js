import { validateAttr } from '../../commons/aria';

function ariaValidAttrEvaluate(node, options, virtualNode, context) {
	options = Array.isArray(options) ? options : [];

	var invalid = [],
		aria = /^aria-/;

	var attr,
		attrs = axe.utils.getNodeAttributes(node);

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