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
	virtualnode,
	context = {}
) {
	const { actualNode } = virtualnode;
	if (!context.startNode) {
		context = { startNode: virtualnode, ...context };
	}

	const computationSteps = [
		aria.getAriaLabelledbyText, // Step 2B.1
		aria.getAriaLabelText, // Step 2C
		text.nativeTextAlternative, // Step 2D
		text.formControlValue, // Step 2E
		text.nameFromContent, // Step 2F
		getTextNodeContent, // Step 2G
		text.descendingContentText, // Step 2H
		getTooltipText // Step 2I
	];

	// Step 2A, check visibility
	if (
		actualNode.nodeType === 1 &&
		!context.includeHidden &&
		!dom.isVisible(actualNode, true)
	) {
		return '';
	}

	// Return the value of the first step that returns with text
	for (let i = 0; i < computationSteps.length; i++) {
		const step = computationSteps[i];
		const outcome = step(virtualnode, context);

		if (outcome !== '') {
			if (context.debug) {
				axe.log(outcome, actualNode, context, step.name);
			}
			return outcome;
		}
	}

	if (context.debug) {
		axe.log('{empty}', actualNode, context);
	}
	return '';
};

function getTextNodeContent({ actualNode }) {
	if (actualNode.nodeType !== 3) {
		return '';
	}
	return actualNode.textContent;
}

function getTooltipText({ actualNode }) {
	if (
		actualNode.nodeType !== 1 ||
		!actualNode.hasAttribute('title') ||
		['none', 'presentation'].includes(aria.getRole(actualNode))
	) {
		return '';
	}
	return text.sanitize(actualNode.getAttribute('title'));
}
