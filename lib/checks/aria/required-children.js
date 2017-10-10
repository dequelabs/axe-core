var requiredOwned = axe.commons.aria.requiredOwned,
implicitNodes = axe.commons.aria.implicitNodes,
matchesSelector = axe.commons.utils.matchesSelector,
idrefs = axe.commons.dom.idrefs;

function owns(node, virtualTree, role, ariaOwned) {
	if (node === null) { return false; }
	var implicit = implicitNodes(role),
	selector = ['[role="' + role + '"]'];

	if (implicit) {
		selector = selector.concat(implicit);
	}

	selector = selector.join(',');
	return ariaOwned ? (matchesSelector(node, selector) || !!axe.utils.querySelectorAll(virtualTree, selector)[0]) :
		!!axe.utils.querySelectorAll(virtualTree, selector)[0];
}

function ariaOwns(nodes, role) {
	var index, length;

	for (index = 0, length = nodes.length; index < length; index++) {
		if (nodes[index] === null) { continue; }
		let virtualTree = axe.utils.getNodeFromTree(axe._tree[0], nodes[index]);
		if (owns(nodes[index], virtualTree, role, true)) {
			return true;
		}
	}
	return false;
}

function missingRequiredChildren(node, childRoles, all, role) {
	//jshint maxstatements: 22, maxcomplexity: 13
	var i,
	l = childRoles.length,
	missing = [],
	ownedElements = idrefs(node, 'aria-owns');

	for (i = 0; i < l; i++) {
		var r = childRoles[i];
		if (owns(node, virtualNode, r) || ariaOwns(ownedElements, r)) {
			if (!all) { return null; }
		} else {
			if (all) { missing.push(r); }
		}
	}

	// combobox exceptions
	if (role === 'combobox') {

		// remove 'textbox' from missing roles if combobox is a native text-type input
		var textboxIndex = missing.indexOf('textbox');
		var textTypeInputs = ['text', 'search', 'email', 'url', 'tel'];
		if (textboxIndex >= 0 && node.tagName === 'INPUT' && textTypeInputs.includes(node.type)) {
			missing.splice(textboxIndex, 1);
		}

		// remove 'listbox' from missing roles if combobox is collapsed
		var listboxIndex = missing.indexOf('listbox');
		var expanded = node.getAttribute('aria-expanded');
		if (listboxIndex >= 0 && (!expanded || expanded === 'false')) {
			missing.splice(listboxIndex, 1);
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

var missing = missingRequiredChildren(node, childRoles, all, role);

if (!missing) { return true; }

this.data(missing);
return false;
