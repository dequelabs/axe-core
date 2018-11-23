/* global text, dom, aria, axe */

/**
 * Finds virtual node and calls accessibleTextVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 * @method accessibleText
 * @memberof axe.commons.text
 * @instance
 * @param {HTMLElement} element The HTMLElement
 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
 * @return {string}
 */
text.accessibleText = function accessibleText(element, context) {
	let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], element); // throws an exception on purpose if axe._tree not correct
	return text.accessibleTextVirtual(virtualNode, context);
};

text.accessibleTextVirtual = function accessibleTextVirtual(
	virtualNode,
	context = {}
) {
	const { actualNode } = virtualNode;
	if (!context.startNode) {
		context = { startNode: virtualNode, ...context };
	}

	const computationSteps = [
		aria.getAriaLabelledbyText, // Step 2B.1
		aria.getAriaLabelText, // Step 2C
		text.nativeTextAlternative, // Step 2D
		text.formControlValue, // Step 2E
		text.nameFromContent, // Step 2F
		getTextNodeContent, // Step 2G
		text.descendingContentText, // Step 2H
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

	if (context.debug) {
		axe.log(accName || '{empty-value}', actualNode, context);
	}
	if (context.startNode === virtualNode) {
		return text.sanitize(accName);
	} else {
		return accName;
	}
};

function getTextNodeContent({ actualNode }) {
	if (actualNode.nodeType !== 3) {
		return '';
	}
	return actualNode.textContent;
}
