import lookupTable from './lookup-table';

/**
 * Check if an aria- attribute name is valid
 * @method validateAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} att The attribute name
 * @return {Boolean}
 */
function validateAttr(att) {
	const attrDefinition = lookupTable.attributes[att];
	return !!attrDefinition;
}

export default validateAttr;
