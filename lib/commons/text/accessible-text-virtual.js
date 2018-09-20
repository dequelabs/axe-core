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
	node,
	context = {}
) {
	const { inLabelledByContext, isDescribedRef, inControlContext } = context;
	const isReffed = inLabelledByContext || isDescribedRef || inControlContext;

	const computationSteps = [
		aria.getAriaLabelledbyText, // Step 2B.1
		getAriaDescribedbyText, // Step 2B.2
		aria.getAriaLabelText, // Step 2C
		text.getNativeTextAlternative, // Step 2D
		text.getControlInLabelText, // Step 2E
		getNameFromContent, // Step 2F
		getTextNodeContent, // Step 2G
		getDescendingContentText, // Step 2H
		getTooltipText // Step 2I
	];

	// Step 2 A, check visibility
	if (
		isReffed &&
		node.actualNode.nodeType === 1 &&
		!dom.isVisible(node.actualNode, true)
	) {
		return '';
	}

	// Return the value of the first step that returns with text
	for (let i = 0; i < computationSteps.length; i++) {
		const step = computationSteps[i];
		const outcome = step(node, context);
		if (outcome !== '') {
			return text.sanitize(outcome);
		}
	}
	return '';
};

/// ------- These can go into their own files:
function getAriaDescribedbyText() {
	return '';
}

function getNameFromContent(element, context) {
	if (element.actualNode.nodeType !== 1) {
		return '';
	}
	const role = aria.getRole(element.actualNode);
	const roleDef = aria.lookupTable.role[role];
	if (!roleDef || !roleDef.nameFrom.includes('contents')) {
		return '';
	}
	return getDescendingContentText(element, context);
}

function getTextNodeContent({ actualNode }) {
	if (actualNode.nodeType !== 3) {
		return '';
	}
	return actualNode.textContent;
}

function getDescendingContentText(element, context) {
	const textContent = element.children.reduce((textContent, child) => {
		const textContentAdd = text.accessibleTextVirtual(child, context);
		if (textContentAdd === '') {
			return textContent;
		}
		return textContent + ' ' + textContentAdd;
	}, '');
	return textContent;
}

function getTooltipText({ actualNode }) {
	if (actualNode.nodeType !== 1 || !actualNode.hasAttribute('title')) {
		return '';
	}
	return text.sanitize(actualNode.getAttribute('title'));
}
