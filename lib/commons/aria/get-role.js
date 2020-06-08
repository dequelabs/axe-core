import isValidRole from './is-valid-role';
import getImplicitRole from './implicit-role';
import lookupTable from './lookup-table';
import { getNodeFromTree, closest } from '../../core/utils';
import isFocusable from '../dom/is-focusable';
import sanitize from '../text/sanitize';

const inheritsPresentation = {
	dd: ['dl'],
	dt: ['dl'],
	li: ['ul', 'ol'],
	tbody: ['table'],
	td: ['table'],
	tfoot: ['table'],
	th: ['table'],
	thead: ['table'],
	tr: ['table']
};

function hasGlobalAriaAttributes(vNode) {
	return lookupTable.globalAttributes.find(
		attr => vNode.hasAttr(attr) && sanitize(vNode.attr(attr))
	);
}

function resolveImplicitRole(vNode) {
	const implicitRole = getImplicitRole(vNode.actualNode);

	if (implicitRole) {
		// an images role is considered implicitly presentation if the
		// alt attribute is empty, but that shouldn't be the case if it
		// has global aria attributes or is focusable, so we need to
		// override the role back to `img`
		// e.g. <img alt="" aria-label="foo"></img>
		if (
			vNode.props.nodeName === 'img' &&
			(hasGlobalAriaAttributes(vNode) || isFocusable(vNode.actualNode))
		) {
			return 'img';
		}

		// role presentation inheritance.
		// Source: https://www.w3.org/TR/wai-aria-1.1/#conflict_resolution_presentation_none
		//
		// when an element inherits the presentational role from a parent
		// is not defined in the spec, but through testing it seems to be
		// when a specific HTML parent relationship is required and that
		// parent has `role=presentation`, then the child inherits the
		// role (i.e. table, ul, dl)
		//
		// from Scott O'Hara:
		//
		// "the expectation for me, in standard html is that element
		// structures that require specific parent/child relationships,
		// if the parent is set to presentational that should set the
		// children to presentational.  ala, tables and lists."
		// "but outside of those specific constructs, i would not expect
		// role=presentation to do anything to child element roles"
		if (inheritsPresentation[vNode.props.nodeName]) {
			const ancestorVNode = closest(vNode, '[role]');

			if (!ancestorVNode) {
				return implicitRole;
			}

			const allowedParents = inheritsPresentation[vNode.props.nodeName];

			if (!allowedParents.includes(ancestorVNode.props.nodeName)) {
				return implicitRole;
			}

			const ancestorRole = getRole(ancestorVNode);

			if (['presentation', 'none'].includes(ancestorRole)) {
				return ancestorRole;
			}
		}
	}

	return implicitRole;
}

/**
 * Return the accessible role of an element
 *
 * @method getRole
 * @memberof axe.commons.aria
 * @instance
 * @param {Element} node
 * @param {Object} options
 * @param {boolean} options.noImplicit  Do not return the implicit role
 * @param {boolean} options.fallback  Allow fallback roles
 * @param {boolean} options.abstracts  Allow role to be abstract
 * @param {boolean} options.dpub  Allow role to be any (valid) doc-* roles
 * @returns {string|null} Role or null
 */
function getRole(node, { noImplicit, fallback, abstracts, dpub } = {}) {
	node = node.actualNode || node;

	const vNode = getNodeFromTree(node);

	if (node.nodeType !== 1) {
		return null;
	}
	const roleAttr = (node.getAttribute('role') || '').trim().toLowerCase();
	// TODO: es-module-utils.tokenList
	const roleList = fallback ? axe.utils.tokenList(roleAttr) : [roleAttr];

	// Get the first valid role:
	const validRoles = roleList.filter(role => {
		if (!dpub && role.substr(0, 4) === 'doc-') {
			return false;
		}
		return isValidRole(role, { allowAbstract: abstracts });
	});

	const explicitRole = validRoles[0] || null;
	if (noImplicit) {
		return explicitRole;
	}

	// Get the implicit role, if permitted
	const implicitRole = resolveImplicitRole(vNode);

	// role conflict resolution
	// Source: https://www.w3.org/TR/wai-aria-1.1/#conflict_resolution_presentation_none
	// See also: https://github.com/w3c/aria/issues/1270
	if (
		!explicitRole ||
		(['presentation', 'none'].includes(explicitRole) &&
			(hasGlobalAriaAttributes(vNode) || isFocusable(node)))
	) {
		return implicitRole;
	}

	return explicitRole;
}

export default getRole;
