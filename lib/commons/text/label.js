import labelVirtual from './label-virtual';

/**
 * Finds virtual node and calls labelVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 * @see axe.commons.text.virtualLabel
 * @method label
 * @memberof axe.commons.text
 * @instance
 * @param  {Element} node The virtual node mapping to the input to test
 * @return {Mixed} String of visible text, or `null` if no label is found
 */
function label(node) {
	// TODO: es-module-utils.getNodeFromTree
	node = axe.utils.getNodeFromTree(node);
	return labelVirtual(node);
}

export default label;
