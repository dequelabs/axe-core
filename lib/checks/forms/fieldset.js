var failureCode,
	self = this;

function getUnrelatedElements(parent, name) {
	return Array.from(parent.querySelectorAll(
		`select,textarea,button,input:not([name="${name}"]):not([type="hidden"])`
	));
}

function checkFieldset(group, name) {

	var firstNode = group.firstElementChild;
	if (!firstNode || firstNode.nodeName.toUpperCase() !== 'LEGEND') {
		self.relatedNodes([group]);
		failureCode = 'no-legend';
		return false;
	}
	if (!axe.commons.text.accessibleText(firstNode)) {
		self.relatedNodes([firstNode]);
		failureCode = 'empty-legend';
		return false;
	}
	var otherElements = getUnrelatedElements(group, name);
	if (otherElements.length) {
		self.relatedNodes(otherElements);
		failureCode = 'mixed-inputs';
		return false;
	}
	return true;
}

function checkARIAGroup(group, name) {

	var hasLabelledByText = axe.commons.dom.idrefs(group, 'aria-labelledby').some(function (element) {
		return element && axe.commons.text.accessibleText(element);
	});
	var ariaLabel = group.getAttribute('aria-label');
	if (!hasLabelledByText && !(ariaLabel && axe.commons.text.sanitize(ariaLabel))) {
		self.relatedNodes(group);
		failureCode = 'no-group-label';
		return false;
	}

	var otherElements = getUnrelatedElements(group, name);
	if (otherElements.length) {
		self.relatedNodes(otherElements);
		failureCode = 'group-mixed-inputs';
		return false;
	}
	return true;
}

function checkTable (group, nodes) {
	if ((group.getAttribute('role') || '').toLowerCase() === 'presentation') {
		return false;
	}

	if (!nodes.every(// Check all nodes are part of the same table
		node => axe.commons.dom.findUp(node, 'table') === group
	)) {
		return false;
	}

	// See if all of the nodes are contained within different table cells
	const cells = [];
	return !nodes.some(node => {
		const cell = axe.commons.dom.findUp(node, 'th, td');
		if (cells.includes(cell)) {
			return true;
		} else {
			cells.push(cell);
		}
	});
}

function spliceCurrentNode(nodes, current) {
	return nodes.filter(function (candidate) {
		return candidate !== current;
	});
}

function runCheck(element) {
	const name = axe.commons.utils.escapeSelector(node.name);
	const type = axe.commons.utils.escapeSelector(node.type);
	const matchingNodes = Array.from(
		document.querySelectorAll(`input[type="${type}"][name="${name}"]`)
	);
	
	if (matchingNodes.length < 2) {
		return true;
	}
	const fieldset = axe.commons.dom.findUp(element, 'fieldset');
	const group = axe.commons.dom.findUp(element, 
		'[role="group"]' + (node.type === 'radio' ? ',[role="radiogroup"]' : '')
	);
	const table = axe.commons.dom.findUp(element, 'table');
		
	if (fieldset) {
		return checkFieldset(fieldset, name);
	} else if (group) {
		return checkARIAGroup(group, name);
	} else if (table) {
		return checkTable(table, matchingNodes);
	} else {
		failureCode = 'no-group';
		self.relatedNodes(spliceCurrentNode(matchingNodes, element));
		return false;
	}
}

var data = {
	name: node.getAttribute('name'),
	type: node.getAttribute('type')
};

var result = runCheck(node);
if (!result) {
	data.failureCode = failureCode;
}
this.data(data);

return result;
