/* global document */
const { forms, dom, text } = axe.commons;
const { nodeName } = virtualNode.props;

// Don't test options, color contrast doesn't work well on these
if (nodeName === 'option') {
	return false;
}

// Don't test empty select elements
if (nodeName === 'select' && !node.options.length) {
	return false;
}

// some input types don't have text, so the rule shouldn't be applied
const nonTextInput = ['hidden', 'range', 'color', 'checkbox', 'radio', 'image'];
if (nodeName === 'input' && nonTextInput.includes(virtualNode.props.type)) {
	return false;
}

if (forms.isDisabled(virtualNode)) {
	return false;
}

// form elements that don't have direct child text nodes need to check that
// the text indent has not been changed and moved the text away from the
// control
const formElements = ['input', 'select', 'textarea'];
if (formElements.includes(nodeName)) {
	const style = window.getComputedStyle(node);
	const textIndent = parseInt(style.getPropertyValue('text-indent'), 10);

	if (textIndent) {
		// since we can't get the actual bounding rect of the text node, we'll
		// use the current nodes bounding rect and adjust by the text-indent to
		// see if it still overlaps the node
		let rect = node.getBoundingClientRect();
		rect = {
			top: rect.top,
			bottom: rect.bottom,
			left: rect.left + textIndent,
			right: rect.right + textIndent
		};

		if (!dom.visuallyOverlaps(rect, node)) {
			return false;
		}
	}

	// Match all form fields, regardless of if they have text
	return true;
}

// check if the element is a label or label descendant for a disabled control
const nodeParentLabel = dom.findUpVirtual(virtualNode, 'label');
if (nodeName === 'label' || nodeParentLabel) {
	let labelNode = nodeParentLabel || node;
	let labelVirtual = nodeParentLabel
		? axe.utils.getNodeFromTree(nodeParentLabel)
		: virtualNode;

	// explicit label of disabled control
	const doc = dom.getRootNode(labelNode);
	const explicitControl = doc.getElementById(labelNode.htmlFor || '');
	const explicitControlVirtual =
		explicitControl && axe.utils.getNodeFromTree(explicitControl);

	if (explicitControlVirtual && forms.isDisabled(explicitControlVirtual)) {
		return false;
	}

	// implicit label of disabled control
	const query =
		'input:not([type="hidden"]):not([type="image"])' +
		':not([type="button"]):not([type="submit"]):not([type="reset"]), select, textarea';
	const implicitControl = axe.utils.querySelectorAll(labelVirtual, query)[0];

	if (implicitControl && forms.isDisabled(implicitControl)) {
		return false;
	}
}

const ariaLabelledbyControls = [];
let ancestorNode = virtualNode;
while (ancestorNode) {
	// Find any ancestor (including itself) that is used with aria-labelledby
	if (ancestorNode.props.id) {
		const doc = dom.getRootNode(node);
		const escapedId = axe.utils.escapeSelector(ancestorNode.props.id);
		const controls = Array.from(
			doc.querySelectorAll(`[aria-labelledby~="${escapedId}"]`)
		);
		const virtualControls = controls.map(control =>
			axe.utils.getNodeFromTree(control)
		);

		ariaLabelledbyControls.push(...virtualControls);
	}
	ancestorNode = ancestorNode.parent;
}

if (
	ariaLabelledbyControls.length > 0 &&
	ariaLabelledbyControls.every(forms.isDisabled)
) {
	return false;
}

const visibleText = text.visibleVirtual(virtualNode, false, true);
const removeUnicodeOptions = {
	emoji: true,
	nonBmp: false,
	punctuations: true
};
if (!visibleText || !text.removeUnicode(visibleText, removeUnicodeOptions)) {
	return false;
}

const range = document.createRange();
const childNodes = virtualNode.children;
let length = childNodes.length;
let child = null;
let index = 0;

for (index = 0; index < length; index++) {
	child = childNodes[index];

	if (
		child.actualNode.nodeType === 3 &&
		text.sanitize(child.actualNode.nodeValue) !== ''
	) {
		range.selectNodeContents(child.actualNode);
	}
}

const rects = range.getClientRects();
length = rects.length;

for (index = 0; index < length; index++) {
	//check to see if the rectangle impinges
	if (dom.visuallyOverlaps(rects[index], node)) {
		return true;
	}
}

return false;
