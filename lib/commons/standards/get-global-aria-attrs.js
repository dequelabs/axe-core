import standards from '../../standards';

/**
 * Return a list of global aria attributes.
 * @return {String[]} List of all global aria attributes
 */
function getGlobalAriaAttrs() {
	return Object.keys(standards.ariaAttrs).filter(attrName => {
		return standards.ariaAttrs[attrName].global;
	});
}

export default getGlobalAriaAttrs;
