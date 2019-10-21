/* global document */

const nodeName = node.nodeName.toUpperCase();
const nodeType = node.type;

if (
	node.getAttribute('aria-disabled') === 'true' ||
	axe.commons.dom.findUpVirtual(virtualNode, '[aria-disabled="true"]')
) {
	return false;
}

if (nodeName === 'INPUT') {
	return (
		['hidden', 'range', 'color', 'checkbox', 'radio', 'image'].indexOf(
			nodeType
		) === -1 && !node.disabled
	);
}

if (nodeName === 'SELECT') {
	return !!node.options.length && !node.disabled;
}

if (nodeName === 'TEXTAREA') {
	return !node.disabled;
}

if (nodeName === 'OPTION') {
	return false;
}

if (
	(nodeName === 'BUTTON' && node.disabled) ||
	axe.commons.dom.findUpVirtual(virtualNode, 'button[disabled]')
) {
	return false;
}

if (
	(nodeName === 'FIELDSET' && node.disabled) ||
	axe.commons.dom.findUpVirtual(virtualNode, 'fieldset[disabled]')
) {
	return false;
}

// check if the element is a label or label descendant for a disabled control
const nodeParentLabel = axe.commons.dom.findUpVirtual(virtualNode, 'label');
if (nodeName === 'LABEL' || nodeParentLabel) {
	let relevantNode = node;
	let relevantVirtualNode = virtualNode;

	if (nodeParentLabel) {
		relevantNode = nodeParentLabel;
		// we need an input candidate from a parent to account for label children
		relevantVirtualNode = axe.utils.getNodeFromTree(nodeParentLabel);
	}
	// explicit label of disabled input
	const doc = axe.commons.dom.getRootNode(relevantNode);
	let candidate =
		relevantNode.htmlFor && doc.getElementById(relevantNode.htmlFor);
	const candidateVirtualNode = axe.utils.getNodeFromTree(candidate);

	if (
		candidate &&
		(candidate.disabled ||
			candidate.getAttribute('aria-disabled') === 'true' ||
			axe.commons.dom.findUpVirtual(
				candidateVirtualNode,
				'[aria-disabled="true"]'
			))
	) {
		return false;
	}

	candidate = axe.utils.querySelectorAll(
		relevantVirtualNode,
		'input:not([type="hidden"]):not([type="image"])' +
			':not([type="button"]):not([type="submit"]):not([type="reset"]), select, textarea'
	);
	if (candidate.length && candidate[0].actualNode.disabled) {
		return false;
	}
}

// label of disabled control associated w/ aria-labelledby
if (node.getAttribute('id')) {
	const id = axe.utils.escapeSelector(node.getAttribute('id'));
	const doc = axe.commons.dom.getRootNode(node);
	const candidate = doc.querySelector('[aria-labelledby~=' + id + ']');
	if (candidate && candidate.disabled) {
		return false;
	}
}

const visibleText = axe.commons.text.visibleVirtual(virtualNode, false, true);
if (
	visibleText === '' ||
	axe.commons.text.removeUnicode(visibleText, {
		emoji: true,
		nonBmp: true,
		punctuations: true
	}) === ''
) {
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
		axe.commons.text.sanitize(child.actualNode.nodeValue) !== ''
	) {
		range.selectNodeContents(child.actualNode);
	}
}

const rects = range.getClientRects();
length = rects.length;

for (index = 0; index < length; index++) {
	//check to see if the rectangle impinges
	if (axe.commons.dom.visuallyOverlaps(rects[index], node)) {
		return true;
	}
}

return false;
