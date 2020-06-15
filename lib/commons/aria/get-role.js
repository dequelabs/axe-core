import getExplicitRole from './get-explicit-role';
import getImplicitRole from './implicit-role';
import { getNodeFromTree } from '../../core/utils';
import AbstractVirtuaNode from '../../core/base/virtual-node/abstract-virtual-node';

/**
 * Return the semantic role of an element
 *
 * @method getRole
 * @memberof axe.commons.aria
 * @instance
 * @param {Element|VirtualNode} node
 * @param {Object} options
 * @param {boolean} options.noImplicit  Do not return the implicit role
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
	if (vNode.props.nodeType !== 1) {
		return null;
	}
	const explicitRole = getExplicitRole(vNode, { fallback, abstracts, dpub });

	// Get the implicit role, if permitted
	if (!explicitRole && !noImplicit) {
		return getImplicitRole(vNode);
	}

	return explicitRole || null;
}

export default getRole;
