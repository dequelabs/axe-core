import { implicitNodes, requiredContext } from '../../commons/aria';
import { findUpVirtual, getRootNode } from '../../commons/dom';
import {
	escapeSelector,
	getNodeFromTree,
	matchesSelector
} from '../../core/utils';

function getSelector(role) {
	var impliedNative = implicitNodes(role) || [];
	return impliedNative.concat('[role="' + role + '"]').join(',');
}

function getMissingContext(virtualNode, requiredContext, includeElement) {
	var index,
		length,
		role = virtualNode.actualNode.getAttribute('role'),
		missing = [];

	if (!requiredContext) {
		requiredContext = requiredContext(role);
	}

	if (!requiredContext) {
		return null;
	}

	for (index = 0, length = requiredContext.length; index < length; index++) {
		if (
			includeElement &&
			matchesSelector(
				virtualNode.actualNode,
				getSelector(requiredContext[index])
			)
		) {
			return null;
		}
		if (
			findUpVirtual(
				virtualNode,
				getSelector(requiredContext[index])
			)
		) {
			//if one matches, it passes
			return null;
		} else {
			missing.push(requiredContext[index]);
		}
	}

	return missing;
}

function getAriaOwners(element) {
	var owners = [],
		o = null;

	while (element) {
		if (element.getAttribute('id')) {
			const id = escapeSelector(element.getAttribute('id'));
			let doc = getRootNode(element);
			o = doc.querySelector(`[aria-owns~=${id}]`);
			if (o) {
				owners.push(o);
			}
		}
		element = element.parentElement;
	}

	return owners.length ? owners : null;
}

function ariaRequiredParentEvaluate(node, options, virtualNode, context) {
	var missingParents = getMissingContext(virtualNode);

	if (!missingParents) {
		return true;
	}

	var owners = getAriaOwners(node);

	if (owners) {
		for (var i = 0, l = owners.length; i < l; i++) {
			missingParents = getMissingContext(
				getNodeFromTree(owners[i]),
				missingParents,
				true
			);
			if (!missingParents) {
				return true;
			}
		}
	}

	this.data(missingParents);
	return false;
}

export default ariaRequiredParentEvaluate;