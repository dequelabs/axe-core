import { accessibleTextVirtual } from '../../commons/text';

function buttonHasVisibleTextEvaluate(node, options, virtualNode) {
	let nodeName = node.nodeName.toUpperCase();
	let role = node.getAttribute('role');
	let label;

	if (nodeName === 'BUTTON' || (role === 'button' && nodeName !== 'INPUT')) {
		label = accessibleTextVirtual(virtualNode);
		this.data(label);

		return !!label;
	} else {
		return false;
	}
}

export default buttonHasVisibleTextEvaluate;
