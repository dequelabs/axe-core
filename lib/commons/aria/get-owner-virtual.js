import getRootNode from '../dom/get-root-node';
import getRole from '../aria/get-role';

/**
 * Get owner element of a provided virtualNode
 * @param {Object} virtualNode virtual node
 * @returns {HTMLElement | undefined}
 */
function getOwnerVirtual(virtualNode) {
	return getAriaOwner(virtualNode) || getOwner(virtualNode);
}

export default getOwnerVirtual;

/**
 * Get aria owner (`aria-owns`) element of a given virtual node that is not semantically hidden
 * @param {Object} vNode virtual node
 * @returns {HTMLElement | undefined}
 */
function getAriaOwner(vNode) {
	if (!vNode) {
		return;
	}

	const id = vNode.attr('id');
	if (!id) {
		return getAriaOwner(vNode.parent);
	}

	const doc = getRootNode(vNode.actualNode);
	const owner = doc.querySelector(
		`[aria-owns~=${axe.utils.escapeSelector(id)}]`
	);
	if (!owner) {
		return getAriaOwner(vNode.parent);
	}
	if (['presentation', 'none'].includes(getRole(owner))) {
		return;
	}

	return owner;
}

/**
 * Get owner element of a given virtual node that is not semantically hidden
 * @param {Object} vNode virutal node
 * @returns {HTMLElement | undefined}
 */
function getOwner(vNode) {
	if (!vNode.parent) {
		return;
	}
	if (['presentation', 'none'].includes(getRole(vNode.parent))) {
		return getOwner(vNode.parent);
	}
	return vNode.parent.actualNode;
}
