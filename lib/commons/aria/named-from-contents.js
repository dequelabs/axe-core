import getRole from './get-role';
import lookupTable from './lookup-table';

/**
 * Check if an element is named from contents
 *
 * @param {Node|VirtualNode} element
 * @param {Object} options
 * @property {Bool} strict Whether or not to follow the spects strictly
 * @return {Bool}
 */
function namedFromContents(node, { strict } = {}) {
	node = node.actualNode || node;
	if (node.nodeType !== 1) {
		return false;
	}

	const role = getRole(node);
	const roleDef = lookupTable.role[role];

	if (
		(roleDef && roleDef.nameFrom.includes('contents')) ||
		// TODO: This is a workaround for axe-core's over-assertive implicitRole computation
		// once we fix that, this extra noImplicit check can be removed.
		node.nodeName.toUpperCase() === 'TABLE'
	) {
		return true;
	}

	/**
	 * Note: Strictly speaking if the role is null, presentation, or none, the element
	 * isn't named from contents. Axe-core often needs to know if an element
	 * has content anyway, so we're allowing it here.
	 * Use { strict: true } to disable this behavior.
	 */
	if (strict) {
		return false;
	}
	return !roleDef || ['presentation', 'none'].includes(role);
}

export default namedFromContents;
