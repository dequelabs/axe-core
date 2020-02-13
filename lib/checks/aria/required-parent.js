const { aria, dom } = axe.commons;

let missingParents = getMissingContext(virtualNode);
if (!missingParents) {
	return true;
}

const owners = getAriaOwners(node);
if (owners) {
	for (var i = 0, l = owners.length; i < l; i++) {
		missingParents = getMissingContext(
			axe.utils.getNodeFromTree(owners[i]),
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

function getSelector(role) {
	var impliedNative = aria.implicitNodes(role) || [];
	return impliedNative.concat('[role="' + role + '"]').join(',');
}

function getMissingContext(virtualNode, requiredContext, includeElement) {
	var index,
		length,
		role = virtualNode.actualNode.getAttribute('role'),
		missing = [];

	if (!requiredContext) {
		requiredContext = aria.requiredContext(role);
	}

	if (!requiredContext) {
		return null;
	}

	for (index = 0, length = requiredContext.length; index < length; index++) {
		const context = requiredContext[index];
		if (
			includeElement &&
			axe.utils.matchesSelector(virtualNode.actualNode, getSelector(context))
		) {
			return null;
		}

		if (hasParentWithRole(virtualNode.actualNode, context)) {
			//if one matches, it passes
			return null;
		} else {
			missing.push(context);
		}
	}
	return missing;
}

function getAriaOwners(element) {
	var owners = [],
		o = null;

	while (element) {
		if (element.getAttribute('id')) {
			const id = axe.utils.escapeSelector(element.getAttribute('id'));
			let doc = dom.getRootNode(element);
			o = doc.querySelector(`[aria-owns~=${id}]`);
			if (o) {
				owners.push(o);
			}
		}
		element = element.parentElement;
	}

	return owners.length ? owners : null;
}

/**
 * Recursively attempt to find parent with a desired role
 * @param {HTMLElement} elm element
 * @param {String} role aria role
 * @returns {Boolean}
 */
function hasParentWithRole(elm, role) {
	const parent = dom.getComposedParent(elm);
	if (!parent) {
		return false;
	}

	const parentRole = aria.getRole(parent, { noImplicit: true });
	if ((!parentRole || parentRole === `presentation`) && parent.nodeType === 1) {
		return hasParentWithRole(parent, role);
	}

	if (parentRole !== role) {
		return false;
	}

	return true;
}
