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

	if (!vNode) {
		return null;
	}

	const nodeName = vNode.props.nodeName.toLowerCase();
	const role = lookupTable.implicitRole[nodeName];

	if (!role) {
		return null;
	}

	if (typeof role === 'function') {
		return role(vNode);
	}

	return role;
}

export default implicitRole;
