import accessibleTextVirtual from './accessible-text-virtual';
import accessibleText from './accessible-text';
import findUpVirtual from '../dom/find-up-virtual';
import findElmsInContext from '../dom/find-elms-in-context';

/**
 * Return accessible text for an implicit and/or explicit HTML label element
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} inControlContext
 * @property {Bool} inLabelledByContext
 * @return {String} Label text
 */
function labelText(virtualNode, context = {}) {
	const { alreadyProcessed } = accessibleTextVirtual;
	if (
		context.inControlContext ||
		context.inLabelledByContext ||
		alreadyProcessed(virtualNode, context)
	) {
		return '';
	}
	if (!context.startNode) {
		context.startNode = virtualNode;
	}

	const labelContext = { inControlContext: true, ...context };
	const explicitLabels = getExplicitLabels(virtualNode);
	const implicitLabel = findUpVirtual(virtualNode, 'label');

	let labels;
	if (implicitLabel) {
		labels = [...explicitLabels, implicitLabel];
		// TODO: es-module-utils.nodeSorter
		labels.sort(axe.utils.nodeSorter);
	} else {
		labels = explicitLabels;
	}

	return labels
		.map(label => accessibleText(label, labelContext))
		.filter(text => text !== '')
		.join(' ');
}

/**
 * Find a non-ARIA label for an element
 * @private
 * @param {VirtualNode} element The VirtualNode instance whose label we are seeking
 * @return {HTMLElement} The label element, or null if none is found
 */
function getExplicitLabels({ actualNode }) {
	if (!actualNode.id) {
		return [];
	}
	return findElmsInContext({
		elm: 'label',
		attr: 'for',
		value: actualNode.id,
		context: actualNode
	});
}

export default labelText;
