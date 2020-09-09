import { getExplicitRole, getRole, requiredContext } from '../../commons/aria';
import { getRootNode } from '../../commons/dom';
import { getNodeFromTree, escapeSelector } from '../../core/utils';

function getMissingContext(virtualNode, reqContext, includeElement) {
	const explicitRole = getExplicitRole(virtualNode);

	if (!reqContext) {
		reqContext = requiredContext(explicitRole);
	}

	if (!reqContext) {
		return null;
	}

	let vNode = includeElement ? virtualNode : virtualNode.parent;
	while (vNode) {
		const parentRole = getRole(vNode);

		// if parent node has a role that is not the required role and not
		// presentational we will fail the check
		if (reqContext.includes(parentRole)) {
			return null;
		} else if (parentRole && !['presentation', 'none'].includes(parentRole)) {
			return reqContext;
		}

		vNode = vNode.parent;
	}

	return reqContext;
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
