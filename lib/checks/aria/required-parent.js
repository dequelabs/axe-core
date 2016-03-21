function getSelector(role) {
	var impliedNative = axe.commons.aria.implicitNodes(role) || [];
	return impliedNative.concat('[role="' + role + '"]').join(',');
}

function getMissingContext(element, requiredContext, includeElement) {
	var index, length,
	role = element.getAttribute('role'),
	missing = [];

	if (!requiredContext) {
		requiredContext = axe.commons.aria.requiredContext(role);
	}

	if (!requiredContext) { return null; }

	for (index = 0, length = requiredContext.length; index < length; index++) {
		if (includeElement && axe.utils.matchesSelector(element, getSelector(requiredContext[index]))) {
			return null;
		}
		if (axe.commons.dom.findUp(element, getSelector(requiredContext[index]))) {
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
		if (element.id) {
			o = document.querySelector('[aria-owns~=' + axe.commons.utils.escapeSelector(element.id) + ']');
			if (o) { owners.push(o); }
		}
		element = element.parentNode;
	}

	return owners.length ? owners : null;
}

var missingParents = getMissingContext(node);

if (!missingParents) { return true; }

var owners = getAriaOwners(node);

if (owners) {
	for (var i = 0, l = owners.length; i < l; i++) {
		missingParents = getMissingContext(owners[i], missingParents, true);
		if (!missingParents) { return true; }
	}
}

this.data(missingParents);
return false;
