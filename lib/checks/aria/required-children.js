const { aria, dom } = axe.commons;
const { requiredOwned, implicitNodes, getRole } = aria;
const { hasContentVirtual, idrefs } = dom;
const { matchesSelector, querySelectorAll, getNodeFromTree } = axe.utils;

const reviewEmpty =
	options && Array.isArray(options.reviewEmpty) ? options.reviewEmpty : [];
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

// Only review empty nodes when a node is both empty and does not have an aria-owns relationship
if (
	reviewEmpty.includes(role) &&
	!hasContentVirtual(virtualNode, false, true) &&
	!getRolesOfDescendant(node).length &&
	idrefs(node, 'aria-owns').length === 0
) {
	return undefined;
}

return false;

/**
 * Get missing children roles
 * @param {HTMLElement} node node
 * @param {String[]} childRoles expected children roles
 * @param {Boolean} all should all child roles be present?
 * @param {String} role role of given node
 */
function missingRequiredChildren(node, childRoles, all, role) {
	let missing = [];
	const ownedElements = idrefs(node, 'aria-owns');
	const descendantRoles = getRolesOfDescendant(node);

	for (let index = 0; index < childRoles.length; index++) {
		const childRole = childRoles[index];
		const ownsRole = owns(node, virtualNode, childRole);
		const ariaOwnsRole = ariaOwns(ownedElements, childRole);
		if (ownsRole || ariaOwnsRole) {
			if (!all) {
				return null;
			}

			/**
			 * Verify if descendants contain one of the requested child roles & that a requested child role is not nested within an overriding role
			 * Only handle when role is not `combobox`, given there is an exception/ different path for `combobox`
			 * Eg:
			 * `<div role="list"><div role="tabpanel"><div role="listitem">List item 1</div></div></div>`
			 * should fail because `listitem` role not under `list` but has `tabpanel` between them, so although `listitem` is owned by `list` this is a failure.
			 */
			if (
				!ariaOwnsRole &&
				role !== 'combobox' &&
				!descendantRoles.includes(childRole)
			) {
				missing.push(childRole);
			}
		} else {
			if (all) {
				missing.push(childRole);
			}
		}
	}

	// combobox exceptions
	if (role === 'combobox') {
		// remove 'textbox' from missing roles if combobox is a native text-type input or owns a 'searchbox'
		const textboxIndex = missing.indexOf('textbox');
		const textTypeInputs = ['text', 'search', 'email', 'url', 'tel'];
		if (
			(textboxIndex >= 0 &&
				node.nodeName.toUpperCase() === 'INPUT' &&
				textTypeInputs.includes(node.type)) ||
			owns(node, virtualNode, 'searchbox') ||
			ariaOwns(ownedElements, 'searchbox')
		) {
			missing.splice(textboxIndex, 1);
		}

		const expandedChildRoles = ['listbox', 'tree', 'grid', 'dialog'];
		const expandedValue = node.getAttribute('aria-expanded');
		const expanded = expandedValue && expandedValue !== 'false';
		const popupRole = (
			node.getAttribute('aria-haspopup') || 'listbox'
		).toLowerCase();

		for (let index = 0; index < expandedChildRoles.length; index++) {
			const expandedChildRole = expandedChildRoles[index];
			// keep the specified popup type required if expanded
			if (expanded && expandedChildRole === popupRole) {
				continue;
			}

			// remove 'listbox' and company from missing roles if combobox is collapsed
			const missingIndex = missing.indexOf(expandedChildRole);
			if (missingIndex >= 0) {
				missing.splice(missingIndex, 1);
			}
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

/**
 * Helper to check if a given node owns an element with a given role
 * @param {HTMLElement} node node
 * @param {Object} virtualTree virtual node
 * @param {String} role role
 * @param {Boolean} ariaOwned
 * @returns {Boolean}
 */
function owns(node, virtualTree, role, ariaOwned) {
	if (node === null) {
		return false;
	}
	const implicit = implicitNodes(role);
	let selector = ['[role="' + role + '"]'];

	if (implicit) {
		selector = selector.concat(
			implicit.map(implicitSelector => implicitSelector + ':not([role])')
		);
	}

	selector = selector.join(',');
	return ariaOwned
		? matchesSelector(node, selector) ||
				!!querySelectorAll(virtualTree, selector)[0]
		: !!querySelectorAll(virtualTree, selector)[0];
}

/**
 * Helper to check if a given node is `aria-owns` an element with a given role
 * @param {HTMLElement[]} nodes nodes
 * @param {String} role role
 * @returns {Boolean}
 */
function ariaOwns(nodes, role) {
	for (let index = 0; index < nodes.length; index++) {
		const node = nodes[index];
		if (node === null) {
			continue;
		}

		const virtualTree = getNodeFromTree(node);
		if (owns(node, virtualTree, role, true)) {
			return true;
		}
	}
	return false;
}

/**
 * Get roles of all descendants for a given node
 * @param {HTMLElement} node node
 * @returns {String[]}
 */
function getRolesOfDescendant(node) {
	if (!node || !node.children) {
		return [];
	}

	return Array.from(node.children).reduce((out, child) => {
		const role = getRole(child);
		if (['presentation', 'none', null].includes(role)) {
			out.push(...getRolesOfDescendant(child));
		} else {
			out.push(role);
		}
		return out;
	}, []);
}
