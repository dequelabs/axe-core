import getGlobalAriaAttrs from '../../commons/standards/get-global-aria-attrs';

function hasGlobalAriaAttributeEvaluate(node, options, virtualNode) {
	return getGlobalAriaAttrs().some(attr => virtualNode.hasAttr(attr));
}

export default hasGlobalAriaAttributeEvaluate;
