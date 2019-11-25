import { getRootNode, idrefs } from '../../commons/dom';
import { accessibleText } from '../../commons/text';
import { escapeSelector } from '../../core/utils';

function groupLabelledbyEvaluate(node, options, virtualNode, context) {
	const type = escapeSelector(node.type);
	const name = escapeSelector(node.name);
	const doc = getRootNode(node);
	const data = {
		name: node.name,
		type: node.type
	};

	const matchingNodes = Array.from(
		doc.querySelectorAll(`input[type="${type}"][name="${name}"]`)
	);
	// There is only one node with this name & type, so there's no need for a group
	if (matchingNodes.length <= 1) {
		this.data(data);
		return true;
	}

	let sharedLabels = idrefs(node, 'aria-labelledby').filter(label => !!label); // Filter for "null" labels
	let uniqueLabels = sharedLabels.slice();

	// Figure out which labels are unique, which are shared by all items, or neither
	matchingNodes.forEach(groupItem => {
		if (groupItem === node) {
			return;
		}
		// Find new labels associated with current groupItem
		const labels = idrefs(groupItem, 'aria-labelledby')
			.filter(newLabel => newLabel);

		sharedLabels = sharedLabels.filter(sharedLabel =>
			labels.includes(sharedLabel)
		);
		uniqueLabels = uniqueLabels.filter(
			uniqueLabel => !labels.includes(uniqueLabel)
		);
	});

	const accessibleTextOptions = {
		// Prevent following further aria-labelledby refs:
		inLabelledByContext: true
	};

	// filter items with no accessible name, do this last for performance reasons
	uniqueLabels = uniqueLabels.filter(labelNode =>
		accessibleText(labelNode, accessibleTextOptions)
	);
	sharedLabels = sharedLabels.filter(labelNode =>
		accessibleText(labelNode, accessibleTextOptions)
	);

	if (uniqueLabels.length > 0 && sharedLabels.length > 0) {
		this.data(data);
		return true;
	}

	if (uniqueLabels.length > 0 && sharedLabels.length === 0) {
		data.failureCode = 'no-shared-label';
	} else if (uniqueLabels.length === 0 && sharedLabels.length > 0) {
		data.failureCode = 'no-unique-label';
	}

	this.data(data);
	return false;
}

export default groupLabelledbyEvaluate;