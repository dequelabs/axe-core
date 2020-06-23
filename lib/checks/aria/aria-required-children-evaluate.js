import { requiredOwned, implicitNodes, getRole } from '../../commons/aria';
import { hasContentVirtual, idrefs } from '../../commons/dom';
import {
	matchesSelector,
	querySelectorAll,
	getNodeFromTree
} from '../../core/utils';

/**
 * Get missing children roles
 * @param {HTMLElement} node node
 * @param {String[]} childRoles expected children roles
 * @param {Boolean} all should all child roles be present?
 * @param {String} role role of given node
 */
function missingRequiredChildren(
	/* eslint max-params: 0 */
	node,
	virtualNode,
	childRoles,
	all,
	role,
	ownedEls,
	descRole
) {
	let missing = [];

	for (let index = 0; index < childRoles.length; index++) {
		const childRole = childRoles[index];
		const ownsRole = owns(node, virtualNode, childRole);
		const ariaOwnsRole = ariaOwns(ownedEls, childRole);
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
			if (role !== 'combobox' && !descRole.includes(childRole)) {
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
			ariaOwns(ownedEls, 'searchbox')
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
 * Get role (that is not presentation or none) of descendant
 * @param {HTMLElement} node node
 * @returns {String[]}
 */
function getDescendantRole(node, ownedEls) {
	const isOwns = ownedEls && ownedEls.length > 0;
	const el = isOwns ? ownedEls[0] : node;

	if (!el) {
		return [];
	}

	const items = isOwns
		? Array.from(el.children).reduce(
				(out, child) => {
					out.push(child);
					return out;
				},
				[el]
		  )
		: Array.from(el.children);

	return items.reduce((out, child) => {
		const role = getRole(child);
		if (['presentation', 'none', null].includes(role)) {
			out = out.concat(getDescendantRole(child));
		} else {
			out.push(role);
		}
		return out;
	}, []);
}

function ariaRequiredChildrenEvaluate(node, options, virtualNode) {
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

	const ownedElements = idrefs(node, 'aria-owns');
	const descendantRole = getDescendantRole(node, ownedElements);
	const missing = missingRequiredChildren(
		node,
		virtualNode,
		childRoles,
		all,
		role,
		ownedElements,
		descendantRole
	);
	if (!missing) {
		return true;
	}

	this.data(missing);

	// Only review empty nodes when a node is both empty and does not have an aria-owns relationship
	if (
		reviewEmpty.includes(role) &&
		!hasContentVirtual(virtualNode, false, true) &&
		!descendantRole.length &&
		idrefs(node, 'aria-owns').length === 0
	) {
		return undefined;
	}

	return false;
}

export default ariaRequiredChildrenEvaluate;
