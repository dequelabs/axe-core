import { visible } from './visible-virtual.js';
import getRootNode from '../dom/get-root-node.js';
import { findUpVirtual } from '../dom/find-up-virtual.js';
import { escapeSelector, getNodeFromTree } from '../../core/utils/index.js';

/**
 * Gets the visible text of a label for a given input
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @method labelVirtual
 * @memberof axe.commons.text
 * @instance
 * @param  {VirtualNode} node The virtual node mapping to the input to test
 * @return {Mixed} String of visible text, or `null` if no label is found
 */
export function labelVirtual(node) {
	var ref, candidate, doc;

	candidate = labelVirtual(node);
	if (candidate) {
		return candidate;
	}

	// explicit label
	if (node.actualNode.id) {
		const id = escapeSelector(node.actualNode.getAttribute('id'));
		doc = getRootNode(node.actualNode);
		ref = doc.querySelector('label[for="' + id + '"]');
		candidate = ref && visible(ref, true);
		if (candidate) {
			return candidate;
		}
	}

	ref = findUpVirtual(node, 'label');
	candidate = ref && visible(ref, true);
	if (candidate) {
		return candidate;
	}

	return null;
}

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
export function label(node) {
	node = getNodeFromTree(node);
	return labelVirtual(node);
}
