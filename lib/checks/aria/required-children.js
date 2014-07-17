var requiredOwned = kslib.aria.requiredOwned,
implicitNodes = kslib.aria.implicitNodes,
matchesSelector = kslib.utils.matchesSelector,
idrefs = kslib.dom.idrefs;

function owns(node, role, ariaOwned) {
	var implicit = implicitNodes(role),
	selector = ['[role="' + role + '"]'];

	if (implicit) {
		selector = selector.concat(implicit);
	}

	selector = selector.join(',');

	return ariaOwned ? (matchesSelector(node, selector) || !!node.querySelector(selector)) :
		!!node.querySelector(selector);
}

function ariaOwns(nodes, role) {
	var index, length;

	for (index = 0, length = nodes.length; index < length; index++) {
		if (owns(nodes[index], role, true)) {
			return true;
		}
	}
	return false;
}

function missingRequiredChildren(node, childRoles, all) {

	var i,
	l = childRoles.length,
	missing = [],
	ownedElements = idrefs(node, 'aria-owns');

	for (i = 0; i < l; i++) {
		var r = childRoles[i];
		if (owns(node, r) || ariaOwns(ownedElements, r)) {
			if (!all) { return null; }
		} else {
			if (all) { missing.push(r); }
		}
	}

	if (missing.length) { return missing; }
	if (!all && childRoles.length) { return childRoles; }
	return null;
}

var role = node.getAttribute('role');
var required = requiredOwned(role);

if (!required) { return true; }

var all = false;
var childRoles = required.one;
if (!childRoles) {
	var all = true;
	childRoles = required.all;
}

var missing = missingRequiredChildren(node, childRoles, all);

if (!missing) { return true; }

this.data(missing);
return false;
