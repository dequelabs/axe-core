var requiredOwned = axe.commons.aria.requiredOwned,
implicitNodes = axe.commons.aria.implicitNodes,
matchesSelector = axe.commons.utils.matchesSelector,
idrefs = axe.commons.dom.idrefs;

function owns(node, role, ariaOwned) {
	if (node === null) { return false; }
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
		if (nodes[index] === null) { continue; }
		if (owns(nodes[index], role, true)) {
			return true;
		}
	}
	return false;
}

function missingRequiredChildren(node, childRoles, all) {
	//jshint maxstatements: 19
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

	// combobox > textbox exception:
	// remove textbox from missing roles if node is a native input
	if (node.tagName === 'INPUT' && node.type === 'text') {
		var textboxIndex = missing.indexOf('textbox');
		if (textboxIndex >= 0) {
			missing.splice(textboxIndex, 1);
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
