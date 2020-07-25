import lookupTable from '../../commons/aria/lookup-table';

function hasGlobalAriaAttributeEvaluate(node, options, virtualNode) {
	return lookupTable.globalAttributes.some(attr => virtualNode.hasAttr(attr));
}

export default hasGlobalAriaAttributeEvaluate;
