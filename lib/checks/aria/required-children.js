const requiredOwned = axe.commons.aria.requiredOwned;
const implicitNodes = axe.commons.aria.implicitNodes;
const matchesSelector = axe.commons.utils.matchesSelector;
const idrefs = axe.commons.dom.idrefs;
const reviewEmpty =
	options && Array.isArray(options.reviewEmpty) ? options.reviewEmpty : [];

function owns(node, virtualTree, role, ariaOwned) {
	if (node === null) {
		return false;
	}
	let implicit = implicitNodes(role),
		selector = ['[role="' + role + '"]'];

	if (implicit) {
		selector = selector.concat(implicit);
	}

	selector = selector.join(',');
	return ariaOwned
		? matchesSelector(node, selector) ||
				!!axe.utils.querySelectorAll(virtualTree, selector)[0]
		: !!axe.utils.querySelectorAll(virtualTree, selector)[0];
}

function ariaOwns(nodes, role) {
	let index, length;

	for (index = 0, length = nodes.length; index < length; index++) {
		if (nodes[index] === null) {
			continue;
		}
		let virtualTree = axe.utils.getNodeFromTree(axe._tree[0], nodes[index]);
		if (owns(nodes[index], virtualTree, role, true)) {
			return true;
		}
	}
	return false;
}

function missingRequiredChildren(node, childRoles, all, role) {
	/* eslint max-statements: ["error", 22], complexity: ["error", 17] */
	let i,
		l = childRoles.length,
		missing = [],
		ownedElements = idrefs(node, 'aria-owns');

	for (i = 0; i < l; i++) {
		const r = childRoles[i];
		if (owns(node, virtualNode, r) || ariaOwns(ownedElements, r)) {
			if (!all) {
				return null;
			}
		} else {
			if (all) {
				missing.push(r);
			}
		}
	}

	// combobox exceptions
	if (role === 'combobox') {
		// remove 'textbox' from missing roles if combobox is a native text-type input
		const textboxIndex = missing.indexOf('textbox');
		const textTypeInputs = ['text', 'search', 'email', 'url', 'tel'];
		if (
			textboxIndex >= 0 &&
			node.tagName === 'INPUT' &&
			textTypeInputs.includes(node.type)
		) {
			missing.splice(textboxIndex, 1);
		}

		// remove 'listbox' from missing roles if combobox is collapsed
		const listboxIndex = missing.indexOf('listbox');
		const expanded = node.getAttribute('aria-expanded');
		if (listboxIndex >= 0 && (!expanded || expanded === 'false')) {
			missing.splice(listboxIndex, 1);
		}
	}

	if (missing.length) {
		return missing;
	}
	if (!all && childRoles.length) {
		return childRoles;
	}
	return null;
}

const role = node.getAttribute('role');
const required = requiredOwned(role);

if (!required) {
	return true;
}

let all = false;
let childRoles = required.one;
if (!childRoles) {
	all = true;
	childRoles = required.all;
}

const missing = missingRequiredChildren(node, childRoles, all, role);

if (!missing) {
	return true;
}

this.data(missing);

if (reviewEmpty.includes(role)) {
	return undefined;
} else {
	return false;
}
