/* global text, dom, aria, axe */

/**
 * Finds virtual node and calls accessibleTextVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 *
 * @param {HTMLElement} element The HTMLElement
 * @param {Object} context
 * @property {Bool} inControlContext
 * @property {Bool} inLabelledByContext
 * @return {string}
 */
text.accessibleText = function accessibleText(element, context) {
	let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], element); // throws an exception on purpose if axe._tree not correct
	return text.accessibleTextVirtual(virtualNode, context);
};

/**
 * Finds virtual node and calls accessibleTextVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 *
 * @param {HTMLElement} element The HTMLElement
 * @param {Object} context
 * @property {Bool} inControlContext
 * @property {Bool} inLabelledByContext
 * @return {string}
 */
text.accessibleTextVirtual = function accessibleTextVirtual(
	virtualNode,
	context = {}
) {
	const { actualNode } = virtualNode;
	if (!context.startNode) {
		context = { startNode: virtualNode, ...context };
	}

	/**
	 * When `aria-labelledby` directly references a `hidden` element
	 * the element needs to be included in the accessible name.
	 *
	 * When a descendent of the `aria-labelledby` reference is `hidden`
	 * the element should not be included in the accessible name.
	 *
	 * This is done by setting `includeHidden` for the `aria-labelledby` reference.
	 */
	if (
		actualNode.nodeType === 1 &&
		context.inLabelledByContext &&
		context.includeHidden === undefined
	) {
		context.includeHidden = !dom.isVisible(actualNode, true);
	}

	const computationSteps = [
		aria.arialabelledbyText, // Step 2B.1
		aria.arialabelText, // Step 2C
		text.nativeTextAlternative, // Step 2D
		text.formControlValue, // Step 2E
		text.subtreeText, // Step 2F + Step 2H
		textNodeContent, // Step 2G (order with 2H does not matter)
		text.titleText // Step 2I
	];

	// Step 2A, check visibility
	if (
		actualNode.nodeType === 1 &&
		!context.includeHidden &&
		!dom.isVisible(actualNode, true)
	) {
		return '';
	}

	// Find the first step that returns a non-empty string
	let accName = computationSteps.reduce((accName, step) => {
		return accName || step(virtualNode, context);
	}, '');

	if (context.startNode === virtualNode) {
		accName = text.sanitize(accName);
	}

	if (context.debug) {
		axe.log(accName || '{empty-value}', actualNode, context);
	}
	return accName;
};

function textNodeContent({ actualNode }) {
	if (actualNode.nodeType !== 3) {
		return '';
	}
	return actualNode.textContent;
}

/**
 * Check if the node is processed with this context before
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {VirtualNode[]} processed
 * @return {Boolean}
 */
text.accessibleTextVirtual.alreadyProcessed = function alreadyProcessed(
	virtualnode,
	context
) {
	context.processed = context.processed || [];
	if (context.processed.includes(virtualnode)) {
		return true;
	}

	context.processed.push(virtualnode);
	return false;
};
