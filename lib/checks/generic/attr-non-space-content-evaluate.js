import { sanitize } from '../../commons/text';

function attrNonSpaceContentEvaluate(node, options = {}, vNode) {
	if (!options.attribute || typeof options.attribute !== 'string') {
		throw new TypeError(
			'attr-non-space-content requires options.attribute to be a string'
		);
	}

	const attribute = vNode.attr(options.attribute) || '';
	return !!sanitize(attribute.trim());
}

export default attrNonSpaceContentEvaluate;
