import { getExplicitRole, getRole, requiredContext } from '../../commons/aria';
import { getRootNode } from '../../commons/dom';
import { getNodeFromTree, escapeSelector } from '../../core/utils';

function getMissingContext(virtualNode, reqContext, includeElement) {
	const missing = [];
	const explicitRole = getExplicitRole(virtualNode);

	if (!reqContext) {
		reqContext = requiredContext(explicitRole);
	}

	if (!reqContext) {
		return null;
	}

	for (let index = 0; index < reqContext.length; index++) {
		let vNode = includeElement ? virtualNode : virtualNode.parent;

		while (vNode) {
			const parentRole = getRole(vNode);

			if (reqContext[index].includes(parentRole)) {
				return null;
			}

			vNode = vNode.parent;
		}

		missing.push(reqContext[index]);
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

function ariaRequiredParentEvaluate(node, options, virtualNode) {
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
