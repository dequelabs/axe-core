import { accessibleText, sanitize } from '../../commons/text';
import {
	idrefs,
	getRootNode,
	findUpVirtual
} from '../../commons/dom';
import { toArray, escapeSelector } from '../../core/utils';

function fieldsetEvaluate(node, options, virtualNode, context) {
	var failureCode,
		self = this;

	function getUnrelatedElements(parent, name) {
		return toArray(
			parent.querySelectorAll(
				'select,textarea,button,input:not([name="' +
					name +
					'"]):not([type="hidden"])'
			)
		);
	}

	function checkFieldset(group, name) {
		var firstNode = group.firstElementChild;
		if (!firstNode || firstNode.nodeName.toUpperCase() !== 'LEGEND') {
			self.relatedNodes([group]);
			failureCode = 'no-legend';
			return false;
		}
		if (!accessibleText(firstNode)) {
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
		var hasLabelledByText = idrefs(group, 'aria-labelledby')
			.some(function(element) {
				return element && accessibleText(element);
			});
		var ariaLabel = group.getAttribute('aria-label');
		if (
			!hasLabelledByText &&
			!(ariaLabel && sanitize(ariaLabel))
		) {
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

	function spliceCurrentNode(nodes, current) {
		return toArray(nodes).filter(function(candidate) {
			return candidate !== current;
		});
	}

	function runCheck(virtualNode) {
		const name = escapeSelector(virtualNode.actualNode.name);
		const root = getRootNode(virtualNode.actualNode);
		const matchingNodes = root.querySelectorAll(
			'input[type="' +
				escapeSelector(virtualNode.actualNode.type) +
				'"][name="' +
				name +
				'"]'
		);

		if (matchingNodes.length < 2) {
			return true;
		}
		const fieldset = findUpVirtual(virtualNode, 'fieldset');
		const group = findUpVirtual(
			virtualNode,
			'[role="group"]' +
				(virtualNode.actualNode.type === 'radio' ? ',[role="radiogroup"]' : '')
		);

		if (!group && !fieldset) {
			failureCode = 'no-group';
			self.relatedNodes(spliceCurrentNode(matchingNodes, virtualNode.actualNode));
			return false;
		} else if (fieldset) {
			return checkFieldset(fieldset, name);
		} else {
			return checkARIAGroup(group, name);
		}
	}

	var data = {
		name: node.getAttribute('name'),
		type: node.getAttribute('type')
	};

	var result = runCheck(virtualNode);
	if (!result) {
		data.failureCode = failureCode;
	}
	this.data(data);

	return result;
}

export default fieldsetEvaluate;