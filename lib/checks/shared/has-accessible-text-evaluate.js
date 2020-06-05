import { accessibleTextVirtual } from '../../commons/text';

function hasAccessibleTextEvaluate(node, options, virtualNode) {
	return accessibleTextVirtual(virtualNode).length > 0;
}

export default hasAccessibleTextEvaluate;
