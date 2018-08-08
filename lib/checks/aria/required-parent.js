function getSelector(role) {
	const impliedNative = axe.commons.aria.implicitNodes(role) || [];
	return impliedNative.concat('[role="' + role + '"]').join(',');
}

function getMissingContext(virtualNode, requiredContext, includeElement) {
	let index,
		length,
		role = virtualNode.actualNode.getAttribute('role'),
		missing = [];

	if (!requiredContext) {
		requiredContext = axe.commons.aria.requiredContext(role);
	}

	if (!requiredContext) {
		return null;
	}

	for (index = 0, length = requiredContext.length; index < length; index++) {
		if (
			includeElement &&
			axe.utils.matchesSelector(
				virtualNode.actualNode,
				getSelector(requiredContext[index])
			)
		) {
			return null;
		}
		if (
			axe.commons.dom.findUpVirtual(
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
	let owners = [],
		o = null;

	while (element) {
		if (element.getAttribute('id')) {
			const id = axe.commons.utils.escapeSelector(element.getAttribute('id'));
			let doc = axe.commons.dom.getRootNode(element);
			o = doc.querySelector(`[aria-owns~=${id}]`);
			if (o) {
				owners.push(o);
			}
		}
		element = element.parentElement;
	}

	return owners.length ? owners : null;
}

let missingParents = getMissingContext(virtualNode);

if (!missingParents) {
	return true;
}

const owners = getAriaOwners(node);

if (owners) {
	for (let i = 0, l = owners.length; i < l; i++) {
		missingParents = getMissingContext(
			axe.utils.getNodeFromTree(axe._tree[0], owners[i]),
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
