import ariaLabelVirtual from '../aria/label-virtual';
import visible from './visible';
import getRootNode from '../dom/get-root-node';
import findUpVirtual from '../dom/find-up-virtual';
import { escapeSelector } from '../../core/utils';

/**
 * Gets the visible text of a label for a given input
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @method labelVirtual
 * @memberof axe.commons.text
 * @instance
 * @param  {VirtualNode} node The virtual node mapping to the input to test
 * @return {Mixed} String of visible text, or `null` if no label is found
 */
function labelVirtual(node) {
	var ref, candidate, doc;

	candidate = ariaLabelVirtual(node);
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

export default labelVirtual;
