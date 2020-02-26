/* global aria, dom */

/**
 * Get owner element of a provided virtualNode
 * @param {Object} virtualNode virtual node
 * @returns {HTMLElement | undefined}
 */
aria.getOwnerVirtual = function getOwnerVirtual(virtualNode) {
	return getAriaOwner(virtualNode) || getOwner(virtualNode);
};

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

	const doc = dom.getRootNode(vNode.actualNode);
	const owner = doc.querySelector(
		`[aria-owns~=${axe.utils.escapeSelector(id)}]`
	);
	if (!owner) {
		return getAriaOwner(vNode.parent);
	}
	if (['presentation', 'none'].includes(aria.getRole(owner))) {
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
	if (['presentation', 'none'].includes(aria.getRole(vNode.parent))) {
		return getOwner(vNode.parent);
	}
	return vNode.parent.actualNode;
}
