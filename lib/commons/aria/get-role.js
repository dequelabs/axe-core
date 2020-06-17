import getExplicitRole from './get-explicit-role';
import getImplicitRole from './implicit-role';
import lookupTable from './lookup-table';
import isFocusable from '../dom/is-focusable';
import { getNodeFromTree } from '../../core/utils';
import AbstractVirtuaNode from '../../core/base/virtual-node/abstract-virtual-node';

// when an element inherits the presentational role from a parent
// is not defined in the spec, but through testing it seems to be
// when a specific HTML parent relationship is required and that
// parent has `role=presentation`, then the child inherits the
// role (i.e. table, ul, dl). Further testing has shown that
// intermediate elements (such as divs) break this chain only in
// Chrome.
//
// Also, any nested structure chains reset the role (so two nested
// lists with the topmost list role=none will not cause the nested
// list to inherit the role=none).
//
// from Scott O'Hara:
//
// "the expectation for me, in standard html is that element
// structures that require specific parent/child relationships,
// if the parent is set to presentational that should set the
// children to presentational.  ala, tables and lists."
// "but outside of those specific constructs, i would not expect
// role=presentation to do anything to child element roles"
const inheritsPresentationChain = {
	// valid parent elements, any other element will prevent any
	// children from inheriting a presentational role from a valid
	// ancestor
	td: ['tr'],
	th: ['tr'],
	tr: ['thead', 'tbody', 'tfoot', 'table'],
	thead: ['table'],
	tbody: ['table'],
	tfoot: ['table'],
	table: [],
	li: ['ol', 'ul'],
	ol: [],
	ul: [],
	dt: ['dl'],
	dd: ['dl'],
	dl: []
};

// role presentation inheritance.
// Source: https://www.w3.org/TR/wai-aria-1.1/#conflict_resolution_presentation_none
function getPresentationalAncestorRole(vNode) {
	const chain = inheritsPresentationChain[vNode.props.nodeName];

	if (!chain) {
		return null;
	}

	const role = getExplicitRole(vNode);
	if (role) {
		if (['presentation', 'none'].includes(role)) {
			return role;
		}

		// an explicit role of anything other than presentational will
		// prevent any children from inheriting a presentational role
		// from a valid ancestor
		return null;
	}

	if (vNode.parent && chain.includes(vNode.parent.props.nodeName)) {
		return getPresentationalAncestorRole(vNode.parent);
	}

	return null;
}

function resolveImplicitRole(vNode) {
	const implicitRole = getImplicitRole(vNode.actualNode);

	if (!implicitRole) {
		return null;
	}

	const presentationalRole = getPresentationalAncestorRole(vNode);
	if (presentationalRole) {
		return presentationalRole;
	}

	return implicitRole;
}

/**
 * Return the semantic role of an element.
 *
 * @method getRole
 * @memberof axe.commons.aria
 * @instance
 * @param {Element|VirtualNode} node
 * @param {Object} options
 * @param {boolean} options.noImplicit  Do not return the implicit role // @deprecated
 * @param {boolean} options.fallback  Allow fallback roles
 * @param {boolean} options.abstracts  Allow role to be abstract
 * @param {boolean} options.dpub  Allow role to be any (valid) doc-* roles
 * @returns {string|null} Role or null
 *
 * @deprecated noImplicit option is deprecated. Use aria.getExplicitRole instead.
 */
function getRole(node, { noImplicit, fallback, abstracts, dpub } = {}) {
	const vNode =
		node instanceof AbstractVirtuaNode ? node : getNodeFromTree(node);
	node = vNode.actualNode;
	if (vNode.props.nodeType !== 1) {
		return null;
	}
	const explicitRole = getExplicitRole(vNode, { fallback, abstracts, dpub });

	if (explicitRole && !['presentation', 'none'].includes(explicitRole)) {
		return explicitRole;
	}

	// role conflict resolution
	// note: Chrome returns a list with resolved role as "generic"
	// instead of as a list
	// (e.g. <ul role="none" aria-label><li>hello</li></ul>)
	// we will return it as a list as that is the best option.
	// Source: https://www.w3.org/TR/wai-aria-1.1/#conflict_resolution_presentation_none
	// See also: https://github.com/w3c/aria/issues/1270
	const hasGlobalAria = lookupTable.globalAttributes.some(attr =>
		vNode.hasAttr(attr)
	);
	if (hasGlobalAria || isFocusable(node)) {
		// return null if there is a conflict resolution but no implicit
		// has been set as the explicit role is not the true role
		return noImplicit ? null : resolveImplicitRole(vNode);
	}

	if (noImplicit && !explicitRole) {
		return null;
	}

	return resolveImplicitRole(vNode);
}

export default getRole;
