import lookupTable from './lookup-table';
import { getNodeFromTree } from '../../core/utils';

/**
 * Get the implicit role for a given node
 * @method implicitRole
 * @memberof axe.commons.aria
 * @instance
 * @param {HTMLElement} node The node to test
 * @return {Mixed} Either the role or `null` if there is none
 */
function implicitRole(node) {
	const vNode = getNodeFromTree(node);

	// this error is only thrown if the virtual tree is not a
	// complete tree, which only happens in linting and if a
	// user used `getFlattenedTree` manually on a subset of the
	// DOM tree
	if (!vNode) {
		throw new ReferenceError(
			'Cannot get implicit role of a node outside the current scope.'
		);
	}

	// until we have proper implicit role lookups for svgs we will
	// avoid giving them one
	if (node.namespaceURI === 'http://www.w3.org/2000/svg') {
		return null;
	}

	const nodeName = vNode.props.nodeName;
	const role = lookupTable.implicitHtmlRole[nodeName];

	if (!role) {
		return null;
	}

	if (typeof role === 'function') {
		return role(vNode);
	}

	return role;
}

export default implicitRole;
